import { Component } from '@angular/core';
import { ButtonModalComponent } from '../../../shared/ui/botones/button-modal/button-modal.component';
import { ButtonSearchComponent } from '../../../shared/ui/botones/button-search/button-search.component';
import classIcon from '../../../../../config/material-icons';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../shared/data-access/services/modal.service';
import { RolService } from '../../data-access/services/rol.service';
import { Rol } from '../../data-access/model/rol';

@Component({
  selector: 'app-rol',
  standalone: true,
  imports: [ButtonModalComponent, ButtonSearchComponent, CommonModule],

  templateUrl: './rol.component.html',
  styleUrl: './rol.component.css'
})
export class RolComponent {

  roles: Rol[] = [];
  existData: boolean = false;


  constructor(
    private readonly srvModal: ModalService,
    private srvRol: RolService
  ) {
    this.srvRol.obtenerRoles();
    this.srvRol.roles$.subscribe((roles: Rol[]) => {
      this.roles = roles;
      if(this.roles.length > 0) {
        this.existData = true;
      }
    });

  }

   classIcon = classIcon.classIcon;
  titulo = 'Roles';

  roles2 = [ 
    { id: 1, nombre: 'Admin', descripcion: 'Administra todo' , estado: 'ACTIVO'},
    { id: 2, nombre: 'User', descripcion: 'Puede ver y editar', estado: 'INACTIVO'},
    { id: 3, nombre: 'Guest', descripcion: 'Solo puede ver', estado: 'ACTIVO'},
  ];


  editarRol(rol: any) {
    this.srvRol.updateRol(rol);

    this.srvModal.setFormModal({
      formulario: 'editarRol',
      title: 'Editar Rol',
    });
    this.srvModal.openModal();

  }
  toggleEstado(rol: Rol) {
    this.srvRol.cambiarEstado(rol.int_rol_id, rol)
  }

}
