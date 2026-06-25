import { Routes } from '@angular/router';
import { Simulator } from './simulator/simulator';
import { About } from './core/about/about';
import { Examples } from './examples/examples';

export const routes: Routes = [
    {
        path: 'run',
        component: Simulator,
    },
    {
        path: 'run/:example_name',
        component: Simulator,
    },
    {
        path: 'examples',
        component: Examples,
    },
    {
        path: 'about',
        component: About,
    },
    {
        path: '',
        redirectTo: '/run',
        pathMatch: 'full'
    }
];
