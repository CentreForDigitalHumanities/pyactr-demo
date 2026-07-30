import { Component, input } from '@angular/core';
import { Simulation } from '../simulation-manager';
import { CommonModule } from '@angular/common';
import { OutputConsole } from '../output-console/output-console';
import { Stepper } from '../stepper/stepper';

@Component({
    selector: 'app-simulator-output',
    imports: [CommonModule, OutputConsole, Stepper],
    templateUrl: './simulator-output.html',
    styleUrl: './simulator-output.scss',
})
export class SimulatorOutput {
    simulation = input<Simulation | null>();
}
