import { Subject } from "rxjs";

/** no-op Python service for testing */
export class PythonMock {
    workerMessage$ = new Subject<any>();

    postMessage() {}
}

