import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./empresa.component').then((m) => m.EmpresaComponent),
    children: [
      {
        path: 'usuarios-empresa',
        loadComponent: () =>
          import('./../usuarios-empresa/usuarios-empresa.component').then(
            (m) => m.UsuariosEmpresaComponent
          ),
      },
    ],
  },
] as Routes;
