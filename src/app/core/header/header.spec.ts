import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header } from './header';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { TEST_PROVIDERS } from '../../shared/test-providers';

describe('Header', () => {
    let component: Header;
    let fixture: ComponentFixture<Header>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Header],
            providers: [
                ...TEST_PROVIDERS,
                provideRouter(routes),
            ]
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
