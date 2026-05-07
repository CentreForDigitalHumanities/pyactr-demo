import { Component, input } from '@angular/core';
import { Simulation } from '../simulation-manager';
import { SharedModule } from '../../shared/shared-module';

@Component({
    selector: 'app-output-status',
    imports: [SharedModule],
    templateUrl: './output-status.html',
})
export class OutputStatus {
    simulation = input.required<Simulation | null>();
}
