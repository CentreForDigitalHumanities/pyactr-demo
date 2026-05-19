import { ComponentFixture, TestBed } from '@angular/core/testing';

import { About } from './about';
import { TEST_PROVIDERS } from '../../shared/test-providers';

describe('About', () => {
    let component: About;
    let fixture: ComponentFixture<About>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: TEST_PROVIDERS,
            imports: [About]
        })
            .compileComponents();

        fixture = TestBed.createComponent(About);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
