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
import { map, of, switchMap } from 'rxjs';


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

    simulationStatus$ = this.simulationManager.current$.pipe(
        switchMap(simulation => simulation ? simulation.status$ : of(null))
    );

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


    /** Copy text function **/

    copyMessage = '';
    private copyMessageTimeout?: ReturnType<typeof setTimeout>;

    async copyToClipboard(): Promise<void> {
        try {
            const text = this.form.controls.code.value ?? '';
            if (text === ''){
                this.copyMessage = "No text to copy!";
            }
            else {
                await navigator.clipboard.writeText(text);
                this.copyMessage = "Copied!";
            }
        }
        catch (error) {
            this.copyMessage = "Copy failed";
            console.error("Could not copy text", error);
        }
        if (this.copyMessageTimeout) {
            clearTimeout(this.copyMessageTimeout);
        }
        this.copyMessageTimeout = setTimeout(() => {
            this.copyMessage = '';
        }, 2000);
    }


    /** Download text function **/

    downloadMessage = '';
    private downloadMessageTimeout?: ReturnType<typeof setTimeout>;

    downloadAsPythonFile(): void {
        try {
            const text = this.form.controls.code.value ?? '';
            if (text === ''){
                this.downloadMessage = "No text to download!";
            }
            else {
                const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a'); // Create an <a> element to trigger the download feature
                a.href = url; // The link refers to the generated URL for the blob
                a.download = 'code.py';
                a.click(); // Simulate a user clicking the link
                setTimeout(() => URL.revokeObjectURL(url), 1000);
                this.downloadMessage = "Download started";
            }
        }
        catch (error) {
            this.downloadMessage = 'Download failed';
            console.error('Could not download file: ', error);
        }
        if (this.downloadMessageTimeout){
            clearTimeout(this.downloadMessageTimeout);
        }
        this.downloadMessageTimeout = setTimeout(() => {
            this.downloadMessage = '';
        }, 2000);
    }


    submit() {
        const code = this.form.controls.code.value || '';
        this.simulationManager.run(code);
    }

    stop() {
        this.simulationManager.stop();
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
