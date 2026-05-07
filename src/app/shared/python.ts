import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/** service to provide Pyodide with pyactr installed */
@Injectable({
  providedIn: 'root',
})
export class Python {
    /** Web worker to run Python code */
    private worker = new Worker(
        new URL('./python.worker', import.meta.url), { type: 'classic' }
    );

    /** Messages sent by by the web worker */
    workerMessage$ = new Subject<any>();

    constructor() {
        this.worker.onmessage = ({data}) => this.onWorkerMessage(data);
    }

    /** Post a message to the Python worker, e.g. to start a script */
    postMessage(data: any) {
        this.worker.postMessage(data);
    }

    private onWorkerMessage(data: any): void {
        this.workerMessage$.next(data);
    }
}
