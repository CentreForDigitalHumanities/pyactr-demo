import { Component, OnInit } from '@angular/core';
import { loadPyodide, PyodideAPI, version as pyodideVersion } from 'pyodide';

@Component({
    selector: 'app-playground',
    imports: [],
    templateUrl: './playground.html',
    styleUrl: './playground.scss',
})
export class Playground implements OnInit {
    ngOnInit() {
        loadPyodide({
            indexURL: `https://cdn.jsdelivr.net/pyodide/v${pyodideVersion}/full/`,
        }).then(this.installPyactr);
    }

    async installPyactr(pyodide: PyodideAPI) {
        await pyodide.loadPackage('micropip');
        const micropip = pyodide.pyimport('micropip');
        await micropip.install('pyactr');
        pyodide.runPython(`
            import pyactr as actr
            playing_memory = actr.ACTRModel()
            actr.chunktype("playgame", "game, activity")
            initial_chunk = actr.makechunk(typename="playgame", game="memory")
            goal = playing_memory.set_goal("goal")
            goal.add(initial_chunk)
            print(goal)
        `)
    }
}
