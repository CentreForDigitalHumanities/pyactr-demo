/// <reference lib="webworker" />

import { type WorkerMessageStatus, type WorkerMessage, type PageMessage } from "./python-interface";

importScripts('https://cdn.jsdelivr.net/pyodide/v0.29.1/full/pyodide.js');

type PyodideAPI = {
    loadPackage: (names: string | string[], options?: any) => Promise<void>;
    pyimport: (mode_name: any) => any;
    runPython: (code: any, options?: any) => any;
    runPythonAsync: (code: any, options?: any) => Promise<any>;
    setStdin: (options?: any) => any;
    setStdout: (options?: any) => any;
    setStderr: (options?: any) => any;
};

declare var loadPyodide: (options: any) => Promise<PyodideAPI>;


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
        this.post('loading');
        const pyodide = await loadPythonAndPackages();
        initialImport(pyodide);
        this.post('starting');
        pyodide.setStdout({
            batched: this.handleStdOut.bind(this),
        });
        pyodide.setStderr({
            batched: this.handleStdErr.bind(this),
        });
        try {
            await pyodide.runPythonAsync(this.script);
            this.post('complete');
        } catch (err) {
            this.post('error', err);
        }
    }

    private post(status: WorkerMessageStatus, data?: any) {
        const message: WorkerMessage = {
            id: this.id,
            status,
            value: data,
        };
        postMessage(message);
    }

    private handleStdOut(value: string): void {
        console.log('stdout:', value);
        this.post('stdout', value);
    }

    private handleStdErr(value: string): void {
        console.error('stderr:', value);
        this.post('stderr', value);
    }

}

addEventListener('message', async ({ data }: { data: PageMessage}) => {
    const runner = new PythonRunner(data.id, data.script);
    runner.run();
});
