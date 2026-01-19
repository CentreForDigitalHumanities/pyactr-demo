import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, startWith, take } from 'rxjs';
import { Python } from '../shared/python';

@Injectable()
export class Simulation {
    code$ = new BehaviorSubject<string>('');

    output$ = new BehaviorSubject<string>('');
    error$ = new BehaviorSubject<string>('');

    private python = inject(Python);
    private pyodide$ = this.python.pyodide$;

    loading$ = this.pyodide$.pipe(
        take(1),
        map(() => false),
        startWith(true),
    );

    run(code: string) {
        this.code$.next(code);
        this.resetOutput();
        this.pyodide$.subscribe(pyodide => {
            pyodide.setStdout({
                batched: this.handleStdout.bind(this),
            });
            pyodide.setStderr({
                batched: this.handleStderr.bind(this),
            })
            pyodide.runPythonAsync(this.code$.value)
        });
    }

    private resetOutput() {
        this.output$.next('');
        this.error$.next('');
    }

    private handleStdout(output: string) {
        this.output$.next(this.output$.value + output + '\n');
    }

    private handleStderr(output: string) {
        this.error$.next(this.error$.value + output + '\n');
    }
}
