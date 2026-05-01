import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, startWith, take } from 'rxjs';
import { Python } from '../shared/python';
import { importPyactr } from '../shared/actr';

export class Simulation {
    output$ = new BehaviorSubject<string>('');
    error$ = new BehaviorSubject<string>('');

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
        pyodide.runPythonAsync(this.code);
    }

    private handleStdOut(output: string): void {
        this.output$.next(this.output$.value + output + '\n');
    }

    private handleStdErr(output: string): void {
        this.error$.next(this.error$.value + output + '\n');
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
