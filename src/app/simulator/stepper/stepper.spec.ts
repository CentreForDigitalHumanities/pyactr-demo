import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Stepper } from './stepper';
import { Simulation } from '../simulation-manager';
import { TEST_PROVIDERS } from '../../shared/test-providers';
import { Python } from '../../shared/python';

describe('Stepper', () => {
    let component: Stepper;
    let simulation: Simulation
    let fixture: ComponentFixture<Stepper>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Stepper],
            providers: TEST_PROVIDERS,
        })
            .compileComponents();

        fixture = TestBed.createComponent(Stepper);
        const python = TestBed.inject(Python);
        simulation = new Simulation(python, 'print(0)')
        fixture.componentRef.setInput('simulation', simulation);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
