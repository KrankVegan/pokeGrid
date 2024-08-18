import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: '',
    loadComponent: () =>
        import('./components/poke-grid/poke-grid.component'),
}];
