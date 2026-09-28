import { Component, computed, input } from '@angular/core';
import { Simulation } from '../simulation-manager';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-stepper',
    imports: [CommonModule],
    templateUrl: './stepper.html',
    styleUrl: './stepper.scss',
})
export class Stepper {
    simulation = input.required<Simulation>();
    disable$ = computed(() => this.disableStepper$(this.simulation()));

    private disableStepper$(simulation: Simulation) {
        return simulation.status$.pipe(
            map(status => ['error', 'interrupt', 'complete'].includes(status.status)),
        )

    }
}
