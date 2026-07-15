import { Python } from "./python";
import { PythonMock } from "./python-mock";
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';
import { provideHttpClient } from '@angular/common/http';

export const TEST_PROVIDERS = [
    { provide: Python, useClass: PythonMock},
    provideRouter(routes),
    provideHttpClient()
];
