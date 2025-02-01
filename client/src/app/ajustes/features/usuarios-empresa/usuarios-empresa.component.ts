import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import classIcon from '../../../../../config/material-icons';
import { ButtonSearchComponent } from '../../../shared/ui/botones/button-search/button-search.component';
import { UsuarioCentro } from '../../data-access/model/usuario-centro';
import { SinDatosComponent } from '../../../shared/ui/sin-datos/sin-datos.component';
import { UsuariosEmpresaService } from '../../data-access/services/usuarios-centro.service';
import { ModalService } from '../../../shared/data-access/services/modal.service';
import { ButtonModalComponent } from '../../../shared/ui/botones/button-modal/button-modal.component';
import { Empresa } from '../../data-access/model/empresa';
import { Subject } from 'rxjs';
import { CentroEmpresa } from '../../data-access/model/centro-empresa';

@Component({
  selector: 'app-usuarios-empresa',
  templateUrl: './usuarios-empresa.component.html',
  styleUrls: ['./usuarios-empresa.component.css'],
  standalone: true,
  imports: [
    ButtonSearchComponent,
    CommonModule,
    SinDatosComponent,
    ButtonModalComponent,
  ],
})
export class UsuariosEmpresaComponent implements OnInit {
  @Output() regresarVista = new EventEmitter();

  users:any[] = [];
  private readonly destroy$ = new Subject<any>();

  existData: boolean = false;
  usuariosEmpresa: UsuarioCentro[] = [];
  empresa!: Empresa;
  centro!: CentroEmpresa;

  constructor(
    private readonly srvUsuarioEmpresa: UsuariosEmpresaService,
    private readonly srvModal: ModalService
  ) {
    
    this.users = [
      {
        id: 1,
        name: 'Kevin A Espinosa',
        email: 'ejemplo@gmail.com',
        phone: '096276829',
        status: 'ACTIVO',
        role: 'Legalizador',
        avatar: 'K',
      },
      {
        id: 2,
        name: 'Nicole Suarez',
        email: 'estefy.gonsi@hotmail.com',
        phone: '099837187',
        status: 'ACTIVO',
        role: 'Administrador N1',
        avatar: 'N',
      },
    ]
  }

  ngOnInit() {
    this.obtenerData();
  }

  obtenerData() {
    this.srvUsuarioEmpresa.usuarios$.subscribe((usuarios: UsuarioCentro[]) => {
      this.usuariosEmpresa = usuarios;
      if (this.usuariosEmpresa.length > 0) {
        this.existData = true;
      }
    });

    this.srvUsuarioEmpresa.dataEmpresa$.subscribe((empresa: Empresa) => {
      this.empresa = empresa;
    });
  }

  classIcon = classIcon.classIcon;

  editarUsuario(usuario: UsuarioCentro) {
    this.srvUsuarioEmpresa.updateUsuario(usuario);
    console.log('Actualizacion ', usuario);
    this.srvModal.setFormModal({
      formulario: 'editarUsuario',
      title: 'Editar Usuario',
    });
    this.srvModal.openModal();
  }

  agregarByCentroId() {
    
  }


  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
