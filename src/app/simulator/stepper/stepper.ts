import { Component, computed, input, ChangeDetectionStrategy } from '@angular/core';
import { Simulation } from '../simulation-manager';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-stepper',
    imports: [CommonModule],
    templateUrl: './stepper.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './stepper.scss',
})
export class Stepper {
    simulation = input.required<Simulation>();
    disable$ = computed(() => this.disableStepper$(this.simulation()));

    intervalValue: number = 1;
    intervalUnit: string = 'steps'

    onIntervalValueChange(event: Event) {
        const input = event.target as HTMLInputElement;
        const value = Number(input.value);
        if (this.intervalUnit === 'steps') {
            this.intervalValue = Math.floor(value);
        } else {
            this.intervalValue = value;
        }
    }

    private disableStepper$(simulation: Simulation) {
        return simulation.status$.pipe(
            map(status => ['error', 'interrupt', 'complete'].includes(status.status)),
        )

    }
}
