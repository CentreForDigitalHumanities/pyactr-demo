import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Python } from './python';
import { PythonMock } from './python-mock';



@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    exports: [
        CommonModule,
    ],
})
export class SharedModule { }

@NgModule({
    imports: [
        SharedModule
    ],
    exports: [
        SharedModule,
    ],
    providers: [
        { provide: Python, useClass: PythonMock }
    ],
})
export class SharedTestingModule { }
