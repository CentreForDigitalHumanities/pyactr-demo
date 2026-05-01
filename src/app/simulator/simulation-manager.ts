import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, ReplaySubject, scan, startWith, take } from 'rxjs';
import { Python } from '../shared/python';
import { importPyactr } from '../shared/actr';

export interface ConsoleEvent {
    type: 'out' | 'err';
    value: string;
}

export class Simulation {

    private consoleStream$ = new ReplaySubject<ConsoleEvent>();
    console$: Observable<ConsoleEvent[]> = this.consoleStream$.pipe(
        scan((acc, curr) => [...acc, curr], [] as ConsoleEvent[]),
        startWith([]),
    );

    constructor(
        pyodide$: Observable<PyodideAPI>,
        public code: string
    ) {
        pyodide$.pipe(take(1)).subscribe(
            pyodide => this.start(pyodide)
        );
    }

    private start(pyodide: PyodideAPI) {
        importPyactr(pyodide);
        pyodide.setStdout({
            batched: this.handleStdOut.bind(this),
        });
        pyodide.setStderr({
            batched: this.handleStdErr.bind(this),
        });
        pyodide.runPythonAsync(this.code).then(
            this.onExecutionComplete.bind(this),
        );
    }

    private handleStdOut(value: string): void {
        console.log('stdout:', value);
        this.consoleStream$.next({ type: 'out', value })
    }

    private handleStdErr(value: string): void {
        console.error('stderr:', value);
        this.consoleStream$.next({ type: 'err', value });
    }

    private onExecutionComplete() {
        this.consoleStream$.complete();
    }
}

@Injectable()
export class SimulationManager {
    current$ = new BehaviorSubject<Simulation | null>(null);

    private python = inject(Python);
    private pyodide$ = this.python.pyodide$;

    loading$ = this.pyodide$.pipe(
        take(1),
        map(() => false),
        startWith(true),
    );

    run(code: string) {
        const simulation = new Simulation(this.pyodide$, code);
        this.current$.next(simulation);
    }

}
