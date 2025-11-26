import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Playground } from './playground/playground';

export const routes: Routes = [
    {
        path: 'home',
        component: Home,
    },
    {
        path: 'playground',
        component: Playground,
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];
