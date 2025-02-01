import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./planificacion.component').then((m) => m.PlanificacionComponent),
    children: [
      {
        path: 'identificacion',
        loadComponent: () =>
          import('./identificacion/identificacion.component').then(
            (m) => m.IdentificacionComponent
          ),
      },
      {
        path: 'determinacion',
        loadComponent: () =>
          import('./determinacion/determinacion.component').then(
            (m) => m.DeterminacionComponent
          ),
      },
      {
        path: 'planificacion-de-acciones',
        loadComponent: () =>
          import(
            './planificacion-de-acciones/planificacion-de-acciones.component'
          ).then((m) => m.PlanificacionDeAccionesComponent),
      },
      {
        path: 'objetivos',
        loadComponent: () =>
          import('./objetivos/objetivos.component').then(
            (m) => m.ObjetivosComponent
          ),
      },
    ],
  },
] as Routes;
