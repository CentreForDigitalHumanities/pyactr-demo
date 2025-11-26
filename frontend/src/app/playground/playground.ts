import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { loadPyodide, PyodideAPI, version as pyodideVersion } from 'pyodide';

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
        ReactiveFormsModule,
    ],
    templateUrl: './playground.html',
    styleUrl: './playground.scss',
})
export class Playground implements OnInit {
    form = new FormGroup({
        code: new FormControl<string>(startingCode, { nonNullable: true }),
    });

    pyodide?: Promise<PyodideAPI>;

    ngOnInit() {
        this.pyodide = loadPyodide({
            indexURL: `https://cdn.jsdelivr.net/pyodide/v${pyodideVersion}/full/`,
        }).then(this.installPyactr);
    }

    async installPyactr(pyodide: PyodideAPI): Promise<PyodideAPI> {
        await pyodide.loadPackage('micropip');
        const micropip = pyodide.pyimport('micropip');
        await micropip.install('pyactr');
        return pyodide;
    }

    onSubmit() {
        if (this.form.value.code) {
            this.pyodide?.then(pyodide => {
                pyodide.runPythonAsync(this.form.value.code || '')
            });
        }
    }
}
