import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header } from './header';
import { SharedTestingModule } from '../../shared/shared-module';

describe('Header', () => {
    let component: Header;
    let fixture: ComponentFixture<Header>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SharedTestingModule, Header]
        })
            .compileComponents();

        fixture = TestBed.createComponent(Header);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
