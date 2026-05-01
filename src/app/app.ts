import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './core/footer/footer';
import { SharedModule } from './shared/shared-module';
import { Header } from './core/header/header';

@Component({
    selector: 'app-root',
    imports: [SharedModule, RouterOutlet, Footer, Header],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App {
    protected readonly title = signal('PyACT-R demo');
}
