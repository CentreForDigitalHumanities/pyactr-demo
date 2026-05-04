import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

let nextID = 0;

export interface ConsoleEvent {
    type: 'out' | 'err';
    value: string;
}

export class Simulation {
    id = nextID++;

    console = signal<ConsoleEvent[]>([]);

    constructor(
        private worker: Worker,
        public code: string
    ) {
    }

    start() {
        this.worker.postMessage({ id: this.id, script: this.code });
        this.worker.onmessage = ({ data }) => this.onWorkerMessage(data);
    }

    stop() {
        // TODO: interrupt execution
    }

    private onWorkerMessage(data: any) {
        // ignore messages from other simulations;
        if (data.id != this.id) {
            return;
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
    }
}

@Injectable()
export class SimulationManager {
    current$ = new BehaviorSubject<Simulation | null>(null);

    private worker = new Worker(
        new URL('./simulation.worker', import.meta.url), { type: 'classic' }
    );

    run(code: string) {
        const simulation = new Simulation(this.worker, code);
        this.current$.next(simulation);
        simulation.start();
    }

}
