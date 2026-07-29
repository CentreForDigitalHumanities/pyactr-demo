import { Component, input } from '@angular/core';
import { Simulation } from '../simulation-manager';

@Component({
    selector: 'app-stepper',
    imports: [],
    templateUrl: './stepper.html',
    styleUrl: './stepper.scss',
})
export class Stepper {
    simulation = input.required<Simulation>();
}
