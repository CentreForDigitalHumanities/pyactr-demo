import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Simulation } from './simulation';
import { SharedModule } from '../shared/shared-module';

const startingCode = `import pyactr as actr

playing_memory = actr.ACTRModel()
actr.chunktype("playgame", "game, activity")
initial_chunk = actr.makechunk(typename="playgame", game="memory")

goal = playing_memory.set_goal("goal")
goal.add(initial_chunk)
print(goal)
`;

@Component({
    selector: 'app-simulator',
    imports: [
        SharedModule,
        ReactiveFormsModule,
    ],
    providers: [
        Simulation
    ],
    templateUrl: './simulator.html',
    styleUrl: './simulator.scss',
})
export class Simulator {
    form = new FormGroup({
        code: new FormControl<string>(startingCode, { nonNullable: true }),
    });

    simulation = inject(Simulation);
    loading$ = this.simulation.loading$;
    output$ = this.simulation.output$;
    error$ = this.simulation.error$;

    onSubmit() {
        this.simulation.run(this.form.value.code || '');
    }
}
