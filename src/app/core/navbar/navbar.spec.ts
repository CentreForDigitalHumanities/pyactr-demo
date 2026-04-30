import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navbar } from './navbar';
import { SharedTestingModule } from '../../shared/shared-module';
import { provideRouter } from '@angular/router';
import { Home } from '../../home/home';
import { routes } from '../../app.routes';

describe('Navbar', () => {
    let component: Navbar;
    let fixture: ComponentFixture<Navbar>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SharedTestingModule, Navbar, Home ],
            providers: [
                provideRouter(routes)
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(Navbar);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
