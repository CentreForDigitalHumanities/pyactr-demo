import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimulationManager } from './simulation-manager';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { exampleScripts, getExample } from '../shared/examplelist';
import { HttpClient } from '@angular/common/http';
import { CodeEditor, Theme } from '@acrodata/code-editor';
import { languages } from '@codemirror/language-data';
import { SimulatorOutput } from "./simulator-output/simulator-output";


@Component({
    selector: 'app-simulator',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        CodeEditor,
        SimulatorOutput
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

    languages = languages;

    simulationManager = inject(SimulationManager);

    private activatedRoute = inject(ActivatedRoute);

    private http = inject(HttpClient);

    theme = signal<Theme>("light");
    indentWithTab = signal<boolean>(true);

    onCheckedDarkTheme(event: Event){
        const checkedTheme = (event.target as HTMLInputElement).checked;
        if (checkedTheme){
            this.theme.set("dark");
        }
        else {
            this.theme.set("light");
        }
    }

    onCheckedTabIndent(event: Event){
        const checkedTab = (event.target as HTMLInputElement).checked;
        if (checkedTab){
            this.indentWithTab.set(true);
        }
        else {
            this.indentWithTab.set(false);
        }
    }


    copyToClipboard() {
        navigator.clipboard.writeText(this.form.controls.code.value ?? '');
    }

    downloadAsPythonFile() {
        const text = this.form.controls.code.value ?? '';

        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        // Create an <a> element to trigger the download feature
        const a = document.createElement('a');
        a.href = url; // The link refers to the generated URL for the blob
        a.download = 'code.py';
        a.click(); // Simulate a user clicking the link

        URL.revokeObjectURL(url);
    }

    onSubmit(id: 'run' | 'stop') {
        if(id === "run"){
            const code = this.form.controls.code.value || '';
            this.simulationManager.run(code);
        }
        else if(id === "stop"){
            this.simulationManager.runStop();
        }
    }

    example:string | null;

    constructor() {
        this.example = this.activatedRoute.snapshot.paramMap.get('example_name');
        if (this.example){
            let exampleScript = getExample(exampleScripts, this.example);
            if (exampleScript){
                const url = "examplescripts/" + exampleScript.filename;
                this.http.get(url, {responseType: "text"}).subscribe((text) =>
                    this.form.controls.code.setValue(text));
            }
        }

    }

}
