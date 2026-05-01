import { TestBed } from '@angular/core/testing';

import { SimulationManager } from './simulation-manager';
import { SharedTestingModule } from '../shared/shared-module';

describe('Simulation', () => {
    let service: SimulationManager;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SharedTestingModule],
            providers: [SimulationManager],
        });
        service = TestBed.inject(SimulationManager);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
