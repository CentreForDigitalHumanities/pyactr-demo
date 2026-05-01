import { Routes } from '@angular/router';
import { Simulator } from './simulator/simulator';

export const routes: Routes = [
    {
        path: 'run',
        component: Simulator,
    },
    {
        path: '',
        redirectTo: '/run',
        pathMatch: 'full'
    }
];
