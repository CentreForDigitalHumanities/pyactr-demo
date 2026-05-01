import { Component, inject } from '@angular/core';
import { SimulationManager } from '../simulation-manager';
import { SharedModule } from '../../shared/shared-module';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-output-console',
  imports: [SharedModule],
  templateUrl: './output-console.html',
  styleUrl: './output-console.scss',
})
export class OutputConsole {
    simulation = inject(SimulationManager);
    output$ = this.simulation.current$.pipe(
        switchMap(simulation =>
            simulation ? simulation.output$ : of('')
        ),
    );
    error$ = this.simulation.current$.pipe(
        switchMap(simulation =>
            simulation ? simulation.error$ : of('')
        ),
    );;
}
