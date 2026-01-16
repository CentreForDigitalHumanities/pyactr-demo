import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Python } from '../shared/python';

const startingCode = `import pyactr as actr

playing_memory = actr.ACTRModel()
actr.chunktype("playgame", "game, activity")
initial_chunk = actr.makechunk(typename="playgame", game="memory")

goal = playing_memory.set_goal("goal")
goal.add(initial_chunk)
print(goal)
`;

@Component({
    selector: 'app-playground',
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    templateUrl: './playground.html',
    styleUrl: './playground.scss',
})
export class Playground implements OnInit {
    form = new FormGroup({
        code: new FormControl<string>(startingCode, { nonNullable: true }),
    });

    python = inject(Python);
    pyodide$ = this.python.pyodide$;

    output$ = new BehaviorSubject<string>('');
    error$ = new BehaviorSubject<string>('');

    ngOnInit() {
        this.pyodide$ = this.python.pyodide$;
    }

    handleStdout(output: string) {
        this.output$.next(this.output$.value + output + '\n');
    }

    handleStderr(output: string) {
        this.error$.next(this.error$.value + output + '\n');
    }

    onSubmit() {
        if (this.form.value.code) {
            this.output$.next('');
            this.error$.next('');
            this.pyodide$.subscribe(pyodide => {
                pyodide.setStdout({
                    batched: this.handleStdout.bind(this),
                });
                pyodide.setStderr({
                    batched: this.handleStderr.bind(this),
                })
                pyodide.runPythonAsync(this.form.value.code || '')
            });
        }
    }
}
