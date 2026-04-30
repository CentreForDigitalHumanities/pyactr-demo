import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Simulator } from './simulator/simulator';

export const routes: Routes = [
    {
        path: 'home',
        component: Home,
    },
    {
        path: 'run',
        component: Simulator,
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];
