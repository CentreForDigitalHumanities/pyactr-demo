import { Component, input } from '@angular/core';
import { Simulation } from '../simulation-manager';
import { CommonModule } from '@angular/common';
import { OutputStatus } from '../output-status/output-status';
import { OutputConsole } from '../output-console/output-console';
import { Stepper } from '../stepper/stepper';

@Component({
    selector: 'app-simulator-output',
    imports: [CommonModule, OutputStatus, OutputConsole, Stepper],
    templateUrl: './simulator-output.html',
    styleUrl: './simulator-output.scss',
})
export class SimulatorOutput {
    simulation = input.required<Simulation>();
}
