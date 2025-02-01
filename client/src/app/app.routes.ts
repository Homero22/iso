import { Routes } from '@angular/router';
import config from '../../config/config';
import { Layouts } from './layout/data-acces/layout';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: config.URL_BASE_PATH,
    data: { layout: Layouts.Simple },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: '404',
        loadComponent: () =>
          import('./pages/failed/failed.component').then(
            (m) => m.FailedComponent
          ),
      },
      {
        path: 'denegado',
        loadComponent: () =>
          import('./pages/denied/denied.component').then(
            (m) => m.DeniedComponent
          ),
      },
      {
        path: 'verificado',
        loadComponent: () =>
          import('./pages/verificado/verificado.component').then(
            (m) => m.VerificadoComponent
          ),
      },
    ],
  },
  {
    canMatch: [authGuard],
    path: config.URL_BASE_PATH,
    data: { layout: Layouts.Full },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.routes'),
      },
      {
        path: 'implementacion',
        loadChildren: () =>
          import(
            './implementacion/mostrar-implementacion/implementacion.routes'
          ),
      },
      {
        path: 'ajustes',
        loadChildren: () => import('./ajustes/ajustes.routes'),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];
