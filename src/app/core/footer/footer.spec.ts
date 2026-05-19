import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Footer } from './footer';
import { TEST_PROVIDERS } from '../../shared/test-providers';

describe('Footer', () => {
    let component: Footer;
    let fixture: ComponentFixture<Footer>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [TEST_PROVIDERS],
            imports: [Footer]
        })
            .compileComponents();

        fixture = TestBed.createComponent(Footer);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
