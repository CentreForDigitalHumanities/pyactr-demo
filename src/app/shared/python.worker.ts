/// <reference lib="webworker" />

importScripts('https://cdn.jsdelivr.net/pyodide/v0.29.1/full/pyodide.js');

const loadPythonAndPackages = async (): Promise<PyodideAPI> => {
    const pyodide = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.29.1/full/' });
    await pyodide.loadPackage('micropip');
    const micropip = pyodide.pyimport('micropip');
    await micropip.install('pyactr');
    return pyodide;
}

const importPyactrSnippet = `
import pyactr as actr
`;

/** Run initial pyactr import.
 * This can be done before connecting the stdout/stderr output, so any warnings that
 * pop up here (e.g. DeprecationWarning) are not shown to the user.
 */
const initialImport = (pyodide: PyodideAPI) => {
    pyodide.runPython(importPyactrSnippet);
}

class PythonRunner {
    constructor(
        public id: number,
        public script: string,
    ) { }

    async run() {
        postMessage({ id: this.id, status: 'loading' });
        const pyodide = await loadPythonAndPackages();
        initialImport(pyodide);
        postMessage({ id: this.id, status: 'starting' });
        pyodide.setStdout({
            batched: this.handleStdOut.bind(this),
        });
        pyodide.setStderr({
            batched: this.handleStdErr.bind(this),
        });
        await pyodide.runPythonAsync(this.script);
        postMessage({ id: this.id, status: 'complete' });
    }

    private handleStdOut(value: string): void {
        console.log('stdout:', value);
        postMessage({ id: this.id, status: 'stdout', value });
    }

    private handleStdErr(value: string): void {
        console.error('stderr:', value);
        postMessage({ id: this.id, status: 'stderr', value });
    }

}

addEventListener('message', async ({ data }: { data: { id: number, script: string }}) => {
    const runner = new PythonRunner(data.id, data.script);
    runner.run();
});
