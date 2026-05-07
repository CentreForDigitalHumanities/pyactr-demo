import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, filter, Subject, takeUntil } from 'rxjs';
import { Python } from '../shared/python';

let nextID = 0;

export interface ConsoleEvent {
    type: 'out' | 'err';
    value: string;
}

export class Simulation {
    id = nextID++;

    loading = signal<boolean>(false);
    console = signal<ConsoleEvent[]>([]);

    private stop$ = new Subject<void>();

    constructor(
        private python: Python,
        public code: string
    ) {
    }

    /** Run simulation code */
    start() {
        this.loading.set(true);
        this.python.postMessage({ id: this.id, script: this.code });
        this.python.workerMessage$.pipe(
            takeUntil(this.stop$),
            filter(message => message.id == this.id), // only listen to this simulation
        ).subscribe(data => this.onWorkerMessage(data));
    }

    /** Stop simulation. The simulation will stop listening to the Python worker.
     * TODO: also interrupt execution.
     */
    stop() {
        this.stop$.next();
        this.stop$.complete();
    }

    private onWorkerMessage(data: any) {
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
            this.stop();
        }
    }
}

@Injectable()
export class SimulationManager {
    private python = inject(Python);

    current$ = new BehaviorSubject<Simulation | null>(null);

    run(code: string) {
        const simulation = new Simulation(this.python, code);
        this.current$.next(simulation);
        simulation.start();
    }

}
