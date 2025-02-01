import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import config from '../../../../../config/config';
import configRoles from '../../../../../config/roles';
import { Router, RouterLink } from '@angular/router';
import { RolesService } from '../../../core/data-access/services/roles.service';

import classIcon from '../../../../../config/material-icons';
import { AuthStateService } from '../../../core/data-access/services/auth-state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  baseUrl: string = config.URL_BASE_PATH;
  userData: any;
  @Input() rolActive: any = {};

  classIcon: string = classIcon.classIcon;

  roles: any = {};

  private readonly destroy$ = new Subject<any>();

  constructor(
    private readonly router: Router,
    public srvRoles: RolesService,
    private readonly srvAuth: AuthStateService
  ) {}

  ngOnInit(): void {
    this.roles = configRoles;
  }

  // Cerrar sesión
  cerrarSeccion() {
    this.srvAuth.logout();
  }

  cambiarRol(idRol: number) {
    const perfil = this.rolActive.listaRoles[idRol];
    console.log('perfil', perfil);
    // this.srvRoles
    //   .postChangeRoles(perfil.id_perfil)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe({
    //     next: (res) => {
    //       let redireccion = this.baseUrl;
    //       switch (perfil.rol) {
    //         case 'SUPERADMIN':
    //           redireccion = redireccion + '/indicadores';
    //           break;
    //         case 'ANALISTA':
    //           redireccion = redireccion + '/compras_publicas';
    //           break;
    //         case 'ADMINISTRADOR':
    //           redireccion = redireccion + '/datos_proyecto';
    //           break;
    //         case 'FISCALIZADOR':
    //           redireccion = redireccion + '/fiscalizador';
    //           break;
    //         case 'TESORERO':
    //           redireccion = redireccion + '/lista_obras';
    //           break;
    //         case 'FINANCIERO':
    //           redireccion = redireccion + '/contactos_responsables';
    //           break;
    //         default:
    //           break;
    //       }
    //       localStorage.setItem('timeCache', String(0));
    //       window.location.href = redireccion;
    //     },
    //     error: (err) => {
    //       console.log('error =>', err);
    //     },
    //   });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
