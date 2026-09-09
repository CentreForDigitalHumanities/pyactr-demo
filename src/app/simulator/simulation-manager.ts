import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, filter, merge, Subject, takeUntil } from 'rxjs';
import { Python } from '../shared/python';
import { WorkerMessage } from '../shared/python-interface';

let nextID = 0;

export type SimulationStatus =
    'idle' // not started yet
    | 'loading' // loading pyodide/pyactr
    | 'loading_interrupt' // interrupted pyactr loading
    | 'loading_error' // error while loading pyactr
    | 'script_running' // user script running
    | 'script_interrupt' // user script interrupted
    | 'script_error' // user script error
    | 'script_complete' // user script complete; no stepper
    | 'stepper_idle' // user script complete; show stepper
    | 'stepper_running' // executing stepper code
    | 'stepper_interrupt' // interrupted stepper code
    | 'stepper_error' // error in stepper code
;

export interface ConsoleEvent {
    type: 'out' | 'err';
    value: string;
}

export const isFinished = (status: SimulationStatus) =>
    [
        'loading_interrupt',
        'loading_error',
        'script_interrupt',
        'script_error',
        'script_complete',
        'stepper_interrupt',
        'stepper_error'
    ].includes(status)


export class Simulation {
    id = nextID++;

    scriptConsole = signal<ConsoleEvent[]>([]);
    stepperConsole = signal<ConsoleEvent[]>([]);
    status$ = new BehaviorSubject<SimulationStatus>('idle');

    private interrupt$ = new Subject<void>();
    private currentConsole = signal<WritableSignal<ConsoleEvent[]>>(this.scriptConsole);

    constructor(
        private python: Python,
        public code: string
    ) { }

    /** Run simulation code */
    start() {
        this.status$.next('loading');
        const stopListening$ = merge(
            this.interrupt$,
            this.status$.pipe(filter(isFinished)),
        );
        this.python.workerMessage$.pipe(
            takeUntil(stopListening$),
            filter(message => message.id == this.id), // only listen to this simulation
        ).subscribe(data => this.onWorkerMessage(data));

        this.python.postMessage({ id: this.id, script: this.code, type: 'start'});
    }

    /** Stop simulation. The simulation will stop listening to the Python worker.
     * TODO: also interrupt execution.
     */
    stop() {
        if (!this.interrupt$.closed) {
            this.python.stop();
            const status = this.status$.value;
            if (status.startsWith('loading')) {
                this.status$.next('loading_interrupt');
            } else if (status.startsWith('script')) {
                this.status$.next('script_interrupt');
            } else if (status.startsWith('stepper')) {
                this.status$.next('stepper_interrupt');
            }
            this.interrupt$.next();
            this.interrupt$.complete();
            this.status$.complete();
        }
    }

    step() {
        this.python.postMessage({ id: this.id, type: 'step' });
    }

    run() {
        this.python.postMessage({ id: this.id, type: 'run' });
    }

    private onWorkerMessage(data: WorkerMessage) {
        if (data.status === 'starting') {
            this.status$.next('script_running');
        }
        if (data.status === 'stdout') {
            this.currentConsole().update((value) =>
                [...value, { type: 'out', value: data.value }]
            );
        }
        if (data.status === 'stderr') {
            this.currentConsole().update((value) =>
                [...value, { type: 'err', value: data.value }]
            );
        }
        if (data.status === 'complete') {
            this.interrupt$.complete();
            if (data.value) {
                this.status$.next('stepper_idle');
                this.currentConsole.set(this.stepperConsole);
            } else {
                this.status$.next('script_complete');
                this.status$.complete();
            }
        }
        if (data.status === 'error') {
            // set console message
            const err = data.value as Error;
            this.currentConsole().update((value) =>
                [...value, { type: 'err' , value: err.message }]
            );
            // update simulation status
            const status = this.status$.value;
            if (status.startsWith('loading')) {
                this.status$.next('loading_error');
            } else if (status.startsWith('script')) {
                this.status$.next('script_error');
            } else if (status.startsWith('stepper')) {
                this.status$.next('stepper_error');
            }
            this.status$.complete();
            // close interrupt observable
            if (!this.interrupt$.closed) {
                this.interrupt$.complete();
            }
        }
    }
}

@Injectable()
export class SimulationManager {
    private python = inject(Python);

    current$ = new BehaviorSubject<Simulation | null>(null);

    /** Run a new simulation. Will stop the current simulation if there is one. */
    run(code: string) {
        this.current$.value?.stop();
        const simulation = new Simulation(this.python, code);
        this.current$.next(simulation);
        simulation.start();
    }

    stop(){
        this.current$.value?.stop();
    }
}
