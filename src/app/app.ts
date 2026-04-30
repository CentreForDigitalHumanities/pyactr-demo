import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './core/footer/footer';
import { Navbar } from './core/navbar/navbar';
import { SharedModule } from './shared/shared-module';

@Component({
    selector: 'app-root',
    imports: [SharedModule, RouterOutlet, Footer, Navbar],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App {
    protected readonly title = signal('PyACT-R demo');
}
