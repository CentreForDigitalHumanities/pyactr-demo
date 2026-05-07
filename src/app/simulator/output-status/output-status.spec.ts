import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputStatus } from './output-status';
import { SharedTestingModule } from '../../shared/shared-module';
import { Simulation } from '../simulation-manager';
import { Python } from '../../shared/python';

describe('OutputStatus', () => {
    let component: OutputStatus;
    let fixture: ComponentFixture<OutputStatus>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [OutputStatus, SharedTestingModule]
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
