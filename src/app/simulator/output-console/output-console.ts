import { Component, inject } from '@angular/core';
import { SimulationManager } from '../simulation-manager';
import { SharedModule } from '../../shared/shared-module';

@Component({
  selector: 'app-output-console',
  imports: [SharedModule],
  templateUrl: './output-console.html',
  styleUrl: './output-console.scss',
})
export class OutputConsole {
    simulation = inject(SimulationManager);
    output$ = this.simulation.output$;
    error$ = this.simulation.error$;
}
