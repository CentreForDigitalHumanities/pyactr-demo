import { Component, input } from '@angular/core';
import { Simulation } from '../simulation-manager';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-output-status',
    imports: [CommonModule],
    templateUrl: './output-status.html',
})
export class OutputStatus {
    simulation = input.required<Simulation | null>();
}
