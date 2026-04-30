import { TestBed } from '@angular/core/testing';

import { Simulation } from './simulation';
import { SharedTestingModule } from '../shared/shared-module';

describe('Simulation', () => {
    let service: Simulation;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SharedTestingModule],
            providers: [Simulation],
        });
        service = TestBed.inject(Simulation);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
