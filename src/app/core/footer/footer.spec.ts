import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Footer } from './footer';
import { SharedTestingModule } from '../../shared/shared-module';

describe('Footer', () => {
    let component: Footer;
    let fixture: ComponentFixture<Footer>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SharedTestingModule, Footer]
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
