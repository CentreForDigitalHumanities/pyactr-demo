import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './core/footer/footer';
import { Header } from './core/header/header';


@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Footer, Header],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App {
    protected readonly title = signal('PyACT-R demo');
}
