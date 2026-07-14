import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SimulationManager } from './simulation-manager';
import { OutputConsole } from './output-console/output-console';
import { OutputStatus } from './output-status/output-status';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { exampleScripts } from '../shared/examplelist';
import { HttpClient } from '@angular/common/http';


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

    private http = inject(HttpClient);

    example:string | null;

    onSubmit() {
        const code = this.form.controls.code.value || '';
        this.simulationManager.run(code);
    }

    constructor() {
        this.example = this.activatedRoute.snapshot.paramMap.get('example_name');
        if (this.example){
            let exampleScript = exampleScripts.find(example => example.name == this.example);
            if (exampleScript){
                const url = "/examplescripts/" + exampleScript.filename;
                this.http.get(url, {responseType: "text"}).subscribe((text) => 
                    this.form.controls.code.setValue(text));
            }
        }

    }

}
