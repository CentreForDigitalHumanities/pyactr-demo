import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, filter, merge, Subject, takeUntil } from 'rxjs';
import { Python } from '../shared/python';
import { WorkerMessage } from '../shared/python-interface';

let nextID = 0;

export interface ConsoleEvent {
    type: 'out' | 'err';
    value: string;
}

export class Simulation {
    id = nextID++;

    loading = signal<boolean>(false);
    console = signal<ConsoleEvent[]>([]);
    finished$ = new BehaviorSubject<boolean>(false);
    interruptBuffer = new Uint8Array(new SharedArrayBuffer(1));

    private interrupt$ = new Subject<void>();

    constructor(
        private python: Python,
        public code: string
    ) { }

    /** Run simulation code */
    start() {
        console.log("RUNNING");
        const stopListening$ = merge(
            this.interrupt$,
            this.finished$.pipe(filter(value => value)),
        );
        this.python.workerMessage$.pipe(
            takeUntil(stopListening$),
            filter(message => message.id == this.id), // only listen to this simulation
        ).subscribe(data => this.onWorkerMessage(data));

        this.loading.set(true);
        this.python.postMessage({ id: this.id, script: this.code, interruptBuffer: this.interruptBuffer, type: 'start'});
    }

    /** Stop simulation. The simulation will stop listening to the Python worker.
     * TODO: also interrupt execution.
     */
    stop() {
        if (!this.interrupt$.closed) {
            console.log("STOPPING");
            this.interruptBuffer[0] = 2;
            this.interrupt$.next();
            this.interrupt$.complete();
            this.finished$.complete();
            
        }
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
            this.finished$.next(true);
        }
        if (data.status == 'error') {
            const err = data.value as Error;
            this.console.update((value) =>
                [...value, { type: 'err' , value: err.message }]
            );
            this.finished$.next(true);
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
