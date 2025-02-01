import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./requisito.component').then((m) => m.RequisitoComponent),
    children: [
      {
        path: 'contexto',
        loadComponent: () =>
          import('../../../features/contexto/contexto.component').then(
            (m) => m.ContextoComponent
          ),
      },
      {
        path: 'liderazgo',
        loadComponent: () =>
          import('../../../features/liderazgo/liderazgo.component').then(
            (m) => m.LiderazgoComponent
          ),
      },
      {
        path: 'planificacion',
        loadChildren: () =>
          import('../../../features/planificacion/planificacion.routes'),
      },
      {
        path: 'apoyo',
        loadComponent: () =>
          import('../../../features/apoyo/apoyo.component').then(
            (m) => m.ApoyoComponent
          ),
      },
      {
        path: 'operacion',
        loadComponent: () =>
          import('../../../features/operacion/operacion.component').then(
            (m) => m.OperacionComponent
          ),
      },
      {
        path: 'evaluacion_desempeno',
        loadComponent: () =>
          import(
            '../../../features/evaluacion-desempeno/evaluacion-desempeno.component'
          ).then((m) => m.EvaluacionDesempenoComponent),
      },
      {
        path: 'mejora',
        loadComponent: () =>
          import('../../../features/mejora/mejora.component').then(
            (m) => m.MejoraComponent
          ),
      },
    ],
  },
] as Routes;
