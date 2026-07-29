/// <reference lib="webworker" />

import { ACTRModel, ACTRSimulation } from "./actr-types";
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
    setInterruptBuffer: (buffer: any) => any;
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

/** whether  */
const isACTRModel = (pyodide: PyodideAPI, value: any): boolean => {
    if (value) {
        const modelCheck = pyodide.runPython(`
from pyactr import ACTRModel
def is_model(value):
    return isinstance(value, ACTRModel)
is_model`);
        return modelCheck(value);
    }
    return false;
}


/** Run initial pyactr import.
 * This can be done before connecting the stdout/stderr output, so any warnings that
 * pop up here (e.g. DeprecationWarning) are not shown to the user.
 */
const initialImport = (pyodide: PyodideAPI) => {
    pyodide.runPython(importPyactrSnippet);
}

class PythonRunner {
    pyodide: Promise<PyodideAPI>;
    model?: ACTRModel;
    simulation?: ACTRSimulation;

    constructor(
        public id: number,
        public script: string,
    ) {
        this.pyodide = loadPythonAndPackages();
    }

    async runScript() {
        this.post('loading');
        const pyodide = await this.pyodide;
        initialImport(pyodide);
        this.post('starting');
        pyodide.setStdout({
            batched: this.handleStdOut.bind(this),
        });
        pyodide.setStderr({
            batched: this.handleStdErr.bind(this),
        });
        try {
            pyodide.runPythonAsync(this.script).then((result) => {
                const hasModel = isACTRModel(pyodide, result);
                if (hasModel) {
                    this.model = result as ACTRModel;
                }
                this.post('complete', hasModel);
            });
        } catch (err) {
            this.post('error', err);
        }
    }

    stepSimulation() {
        if (this.model) {
            if (!this.simulation) {
                this.simulation = this.newSimulation(this.model);
            }
            try {
                this.simulation.step();
            } catch (err) {
                this.post('error', err);
            }
        }
    }

    runSimulation() {
        if (this.model) {
            if (!this.simulation) {
                this.simulation = this.newSimulation(this.model);
            }
            try {
                this.simulation.run();
            } catch (err) {
                this.post('error', err);
            }
        }
    }

    private newSimulation(model: ACTRModel): ACTRSimulation {
        return model.simulation.callKwargs({gui: false});
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

let runner: PythonRunner;

addEventListener('message', async ({ data }: { data: PageMessage}) => {
    if (data.type === 'start') {
        runner = new PythonRunner(data.id, data.script);
        runner.runScript();
    }

    if (data.type == 'step') {
        runner?.stepSimulation();
    }

    if (data.type == 'run') {
        runner?.runSimulation();
    }
});
