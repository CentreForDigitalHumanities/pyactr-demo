import { Injectable } from '@angular/core';
import { from, Observable, shareReplay } from 'rxjs';

/** service to provide Pyodide with pyactr installed */
@Injectable({
  providedIn: 'root',
})
export class Python {
    pyodide$: Observable<PyodideAPI>;

    private pyodideUrl = `https://cdn.jsdelivr.net/pyodide/v0.29.1/full/`;

    constructor() {
        this.pyodide$ = from(
            this.fetchPyodide().then(this.installPyactr)
        ).pipe(
            shareReplay(1)
        );
    }

    private fetchPyodide(): Promise<PyodideAPI> {
        return loadPyodide({ indexURL: this.pyodideUrl });
    }

    private async installPyactr(pyodide: PyodideAPI): Promise<PyodideAPI> {
        await pyodide.loadPackage('micropip');
        const micropip = pyodide.pyimport('micropip');
        await micropip.install('pyactr');
        return pyodide;
    }
}
