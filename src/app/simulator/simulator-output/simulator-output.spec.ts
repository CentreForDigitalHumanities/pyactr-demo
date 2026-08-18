import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorOutput } from './simulator-output';
import { Simulation } from '../simulation-manager';
import { TEST_PROVIDERS } from '../../shared/test-providers';
import { Python } from '../../shared/python';

describe('SimulatorOutput', () => {
    let component: SimulatorOutput;
    let fixture: ComponentFixture<SimulatorOutput>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: TEST_PROVIDERS,
            imports: [SimulatorOutput]
        })
            .compileComponents();

        fixture = TestBed.createComponent(SimulatorOutput);
        component = fixture.componentInstance;
        const python = TestBed.inject(Python);
        fixture.componentRef.setInput('simulation', new Simulation(python, ''));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
