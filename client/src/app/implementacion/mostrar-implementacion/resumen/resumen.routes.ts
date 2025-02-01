import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./resumen.component').then((m) => m.ResumenComponent),
    children: [
      {
        path: 'requisito/:codigo',
        loadChildren: () => import('./requisito/requisito.routes'),
      },
    ],
  },
] as Routes;
