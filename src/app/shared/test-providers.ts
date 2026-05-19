import { Python } from "./python";
import { PythonMock } from "./python-mock";

export const TEST_PROVIDERS = [
    { provide: Python, useClass: PythonMock }
];
