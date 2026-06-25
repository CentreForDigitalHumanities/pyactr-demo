import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-examples',
    imports: [CommonModule, RouterLink],
    templateUrl: './examples.html',
    styleUrl: './examples.scss'
})
export class Examples {
    examplescripts = [{name : "addition", filename : "u1_addition.py"}];


}
