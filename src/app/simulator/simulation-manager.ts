import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, filter, merge, Subject, takeUntil } from 'rxjs';
import { Python } from '../shared/python';
import { WorkerMessage } from '../shared/python-interface';

let nextID = 0;

export type SimulationStatus =
    'idle' | 'loading' | 'running' | 'stepper' | 'complete' | 'interrupt' | 'error';

export interface ConsoleEvent {
    type: 'out' | 'err';
    value: string;
}

export class Simulation {
    id = nextID++;

    loading = signal<boolean>(false);
    console = signal<ConsoleEvent[]>([]);
    status$ = new BehaviorSubject<SimulationStatus>('idle');
    stepperAvailable = signal<boolean>(false);

    private interrupt$ = new Subject<void>();

    constructor(
        private python: Python,
        public code: string
    ) { }

    /** Run simulation code */
    start() {
        this.status$.next('running');
        const stopListening$ = merge(
            this.interrupt$,
            this.status$.pipe(filter(value => value == 'complete' || value == 'error' || value == 'interrupt')),
        );
        this.python.workerMessage$.pipe(
            takeUntil(stopListening$),
            filter(message => message.id == this.id), // only listen to this simulation
        ).subscribe(data => this.onWorkerMessage(data));

        this.loading.set(true);
        this.python.postMessage({ id: this.id, script: this.code, type: 'start'});
    }

    /** Stop simulation. The simulation will stop listening to the Python worker.
     * TODO: also interrupt execution.
     */
    stop() {
        if (!this.interrupt$.closed) {
            this.python.stop();
            this.status$.next('interrupt');
            this.interrupt$.next();
            this.interrupt$.complete();
            this.status$.complete();
            this.loading.set(false);
        }
    }

    step() {
        this.python.postMessage({ id: this.id, type: 'step' });
    }

    run() {
        this.python.postMessage({ id: this.id, type: 'run' });
    }

    private onWorkerMessage(data: WorkerMessage) {
        if (data.status == 'starting') {
            this.loading.set(false);
        }
        if (data.status == 'stdout') {
            this.console.update((value) =>
                [...value, { type: 'out', value: data.value }]
            );
        }
        if (data.status == 'stderr') {
            this.console.update((value) =>
                [...value, { type: 'err', value: data.value }]
            );
        }
        if (data.status == 'complete') {
            if (data.value) {
                this.status$.next('stepper');
                this.stepperAvailable.set(true);
            } else {
                this.status$.next('complete');
            }
        }
        if (data.status == 'error') {
            const err = data.value as Error;
            this.console.update((value) =>
                [...value, { type: 'err' , value: err.message }]
            );
            this.status$.next('error');
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

    runStop(){
        this.current$.value?.stop();
    }
}
