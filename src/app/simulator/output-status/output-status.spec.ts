import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputStatus } from './output-status';
import { Simulation } from '../simulation-manager';
import { Python } from '../../shared/python';
import { TEST_PROVIDERS } from '../../shared/test-providers';

describe('OutputStatus', () => {
    let component: OutputStatus;
    let fixture: ComponentFixture<OutputStatus>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: TEST_PROVIDERS,
            imports: [OutputStatus]
        })
            .compileComponents();

        fixture = TestBed.createComponent(OutputStatus);
        component = fixture.componentInstance;
        const python = TestBed.inject(Python);
        fixture.componentRef.setInput('simulation', new Simulation(python, ''));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
