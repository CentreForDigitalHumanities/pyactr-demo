import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Demo } from './demo/demo';

export const routes: Routes = [
    {
        path: 'home',
        component: Home,
    },
    {
        path: 'demo',
        component: Demo,
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];
