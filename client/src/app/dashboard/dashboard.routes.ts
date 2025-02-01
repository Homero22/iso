import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard.component').then((m) => m.DashboardComponent),
    children: [
      {
        path: 'resumen-ejecutivo/:empresa',
        loadComponent: () =>
          import(
            './features/resumen-ejecutivo/resumen-ejecutivo.component'
          ).then((m) => m.ResumenEjecutivoComponent),
      },
    ],
  },
] as Routes;
