import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SimulationManager } from './simulation-manager';
import { OutputConsole } from './output-console/output-console';
import { OutputStatus } from './output-status/output-status';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-simulator',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        OutputConsole,
        OutputStatus,
    ],
    providers: [
        SimulationManager
    ],
    templateUrl: './simulator.html',
    styleUrl: './simulator.scss',
})
export class Simulator {
    form = new FormGroup({
        code: new FormControl<string>("", { nonNullable: true }),
    });

    simulationManager = inject(SimulationManager);

    private activatedRoute = inject(ActivatedRoute);
    example:string | null;

    onSubmit() {
        const code = this.form.controls.code.value || '';
        this.simulationManager.run(code);
    }

    constructor() {
        this.example = this.activatedRoute.snapshot.paramMap.get('example_name');
        console.log(this.example);
    }
}
