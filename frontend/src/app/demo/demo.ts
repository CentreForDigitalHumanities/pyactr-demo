import { Component, OnInit } from '@angular/core';
import { loadPyodide, version as pyodideVersion } from 'pyodide';

@Component({
    selector: 'app-demo',
    imports: [],
    templateUrl: './demo.html',
    styleUrl: './demo.scss',
})
export class Demo implements OnInit {
    ngOnInit() {
        loadPyodide({
            indexURL: `https://cdn.jsdelivr.net/pyodide/v${pyodideVersion}/full/`,
        }).then(py => {
            py.runPython('print("test")')
        });
    }
}
