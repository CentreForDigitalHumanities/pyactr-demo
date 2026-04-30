import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { SharedTestingModule } from './shared/shared-module';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

describe('App', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SharedTestingModule, App],
            providers: [
                provideRouter(routes),
            ]
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(App);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
