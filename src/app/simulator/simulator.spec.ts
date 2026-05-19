import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Simulator } from './simulator';
import { TEST_PROVIDERS } from '../shared/test-providers';

describe('Simulator', () => {
    let component: Simulator;
    let fixture: ComponentFixture<Simulator>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: TEST_PROVIDERS,
            imports: [Simulator]
        })
            .compileComponents();

        fixture = TestBed.createComponent(Simulator);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
