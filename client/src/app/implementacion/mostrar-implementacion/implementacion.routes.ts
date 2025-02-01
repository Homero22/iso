import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./mostrar-implementacion.component').then(
        (m) => m.MostrarImplementacionComponent
      ),
    children: [
      {
        path: 'resumen/:id',
        loadChildren: () => import('./resumen/resumen.routes'),
      },
    ],
  },
  // {
  //   path: '',
  //   pathMatch: 'full', // Redirige a una ruta predeterminada si no hay más parámetros
  //   loadComponent: () =>
  //     import('./mostrar-implementacion.component').then(
  //       (m) => m.MostrarImplementacionComponent
  //     ),
  // },
  // {
  //   path: 'resumen/:id',
  //   children: [
  //     {
  //       path: '',
  //       loadComponent: () =>
  //         import('./resumen/resumen.component').then((m) => m.ResumenComponent),
  //     },
  //     {
  //       path: 'requisito/:codigo',
  //       loadComponent: () =>
  //         import('./resumen/requisito/requisito.component').then(
  //           (m) => m.RequisitoComponent
  //         ),
  //     },
  //   ],
  // },
] as Routes;
