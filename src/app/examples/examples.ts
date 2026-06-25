import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-examples',
    imports: [CommonModule],
    templateUrl: './examples.html',
    styleUrl: './examples.scss'
})
export class Examples {
    examplescripts = [{name : "addition", filename : "u1_addition.py"}];
    

}
