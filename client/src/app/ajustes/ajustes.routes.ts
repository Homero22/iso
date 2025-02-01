import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./settings/settings.component').then((m) => m.SettingsComponent),
    children: [
      {
        path: 'roles',
        loadComponent: () =>
          import('./features/rol/rol.component').then((m) => m.RolComponent),
      },
      {
        path: 'perfil-usuario',
        loadComponent: () =>
          import('./features/perfil-usuario/perfil-usuario.component').then(
            (m) => m.PerfilUsuarioComponent
          ),
      },
      {
        path: 'empresa',
        loadChildren: () => import('./features/empresa/empresa.routes'),
      },
    ],
  },
] as Routes;
