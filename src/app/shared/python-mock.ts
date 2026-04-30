import { BehaviorSubject } from "rxjs";

class PyodideMock implements Partial<PyodideAPI> {}

/** fake Python service for testing */
export class PythonMock {
    pyodide$ = new BehaviorSubject(new PyodideMock());
}

