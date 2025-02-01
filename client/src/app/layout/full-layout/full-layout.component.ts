import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { RolesService } from '../../core/data-access/services/roles.service';
import { HeaderComponent } from '../../shared/ui/header/header.component';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../shared/ui/sidebar/sidebar.component';

@Component({
  selector: 'app-full-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './full-layout.component.html',
  styleUrl: './full-layout.component.css',
})
export class FullLayoutComponent implements OnInit {
  rolActive: any = {
    representarMenu: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        icon: 'dashboard',
        status: true,
      },
      // {
      //   path: '/liderazgo',
      //   name: 'Liderazgo',
      //   icon: 'group',
      //   status: true,
      // },
      // {
      //   path: '/planificacion',
      //   name: 'Planificación',
      //   icon: 'folder_shared',
      //   status: true,
      // },
      // {
      //   path: '/apoyo',
      //   name: 'Apoyo',
      //   icon: 'supervisor_account',
      //   status: true,
      // },
      {
        path: '/implementacion',
        name: 'Implementación',
        icon: 'move_down',
        status: true,
      },
      // {
      //   path: '/planificacion-de-acciones',
      //   name: 'Planificacion de Acciones',
      //   icon: 'bubble_chart',
      //   status: true,
      // },
    ],

    listaRoles: [
      {
        id_perfil: 21,
        per_id: 52255,
        descripcion: 'ROL DE ADMINISTRADOR DEL SISTEMA',
        usuario: 'RUBEN DARIO VALENCIA NAVARRETE',
        rol: 'SUPERADMIN',
        estadoperfil: 'ACTIVO',
        fechacreacion: '2023-01-20T17:44:18.996Z',
        fechaact: '2023-01-20T17:44:18.996Z',
      },
    ],
    rolEstablecido: { id_perfil: 21, rol: 'SUPERADMIN' },
  };

  private readonly destroy$ = new Subject<any>();

  constructor(public srvRoles: RolesService) {}

  ngOnInit(): void {
    // this.getRolesNMenus();
  }

  // getRolesNMenus() {
  //   this.srvRoles
  //     .getMeRoles()
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe({
  //       next: (res) => {
  //         let repMenu: any = [];
  //         res.menu?.forEach((item: any) => {
  //           if (!item.subMenu) {
  //             repMenu.push(item);
  //             const menuUser: any[] = res.menu.filter((t: any) => {
  //               return item.int_id_menu === t.subMenu;
  //             });
  //             repMenu[repMenu.length - 1].children =
  //               repMenu[repMenu.length - 1].children || [];
  //             repMenu[repMenu.length - 1].children.push(...menuUser);
  //           }
  //         });

  //         repMenu.push({
  //           bln_crear: true,
  //           bln_editar: true,
  //           bln_eliminar: true,
  //           bln_ver: true,
  //           children: [],
  //           description: '',
  //           icon: '',
  //           int_id_menu: 0,
  //           name: '',
  //           path: '',
  //           status: true,
  //           subMenu: null,
  //         });

  //         this.rolActive = {
  //           listaRoles: res.body,
  //           rolEstablecido: res.rol,
  //           menu: res.menu,
  //           representarMenu: repMenu,
  //         };
  //       },
  //       error: (err) => {
  //         console.log('error => ', err);
  //       },
  //     });
  // }
}
