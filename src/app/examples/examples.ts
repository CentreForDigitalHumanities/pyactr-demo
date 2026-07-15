import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { exampleScripts } from '../shared/examplelist';

@Component({
    selector: 'app-examples',
    imports: [CommonModule, RouterLink],
    templateUrl: './examples.html',
    styleUrl: './examples.scss'
})
export class Examples {
    exampleScripts = exampleScripts;


}
