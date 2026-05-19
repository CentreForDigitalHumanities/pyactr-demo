import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Examples } from './examples';
import { TEST_PROVIDERS } from '../shared/test-providers';

describe('Examples', () => {
    let component: Examples;
    let fixture: ComponentFixture<Examples>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: TEST_PROVIDERS,
            imports: [Examples]
        })
            .compileComponents();

        fixture = TestBed.createComponent(Examples);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
