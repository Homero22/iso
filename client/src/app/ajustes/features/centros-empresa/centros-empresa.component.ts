import { Component, Input, OnInit } from '@angular/core';
import { ButtonEditComponent } from "../../../shared/ui/botones/button-edit/button-edit.component";
import { ButtonDeleteComponent } from "../../../shared/ui/botones/button-delete/button-delete.component";
import { Empresa } from '../../data-access/model/empresa';
import { UsuariosEmpresaService } from '../../data-access/services/usuarios-centro.service';
import { Router, RouterModule } from '@angular/router';
import { ButtonAddComponent } from "../../../shared/ui/botones/button-add/button-add.component";
import { ButtonModalComponent } from "../../../shared/ui/botones/button-modal/button-modal.component";
import { CentroEmpresaService } from '../../data-access/services/centro-empresa.service';
import { CentroEmpresa } from '../../data-access/model/centro-empresa';
import { SinDatosComponent } from "../../../shared/ui/sin-datos/sin-datos.component";
import Swal from 'sweetalert2';
import { ModalService } from '../../../shared/data-access/services/modal.service';

@Component({
  selector: 'app-centros-empresa',
  templateUrl: './centros-empresa.component.html',
  styleUrls: ['./centros-empresa.component.css'],
  standalone: true,
  imports: [RouterModule, ButtonEditComponent, ButtonDeleteComponent, ButtonAddComponent, ButtonModalComponent, SinDatosComponent],
})
export class CentrosEmpresaComponent implements OnInit {

  //RECIBO EL ID DE LA EMPRESA
  @Input() Empresa!: Empresa;
  isClicked: boolean = false;
  titulo = '';
  existData: boolean = false;

  centros!: CentroEmpresa[];

  constructor(
    private readonly srvUsuarioEmpresa: UsuariosEmpresaService,
    private readonly router: Router,
    private readonly srvCentros: CentroEmpresaService,
    private readonly srvModal: ModalService
  ) { }

  ngOnInit() {
    this.titulo = this.Empresa.str_empresa_nombre;
    this.srvCentros.centros$.subscribe((centros: CentroEmpresa[]) => {
      this.centros = centros;
      if (this.centros.length > 0) {
        this.centros = centros;
        this.existData = true;
      }
    });


        
  }
  
  deleteRow(id: number) {
    console.log('deleteRow', id);
  }
  editRow(centro: CentroEmpresa) {
    this.srvUsuarioEmpresa.setDataCentro(centro);
    this.srvModal.setFormModal({
      formulario: 'editarCentro',
      title: 'Editar Centro',
    });
    this.srvModal.openModal();

  }
  verUsuarios(centroId: number, centro: CentroEmpresa) {
      this.srvUsuarioEmpresa.setDataEmpresa(this.Empresa);
      this.srvUsuarioEmpresa.setDataCentro(centro);
      this.srvUsuarioEmpresa.obtenerUsuariosCentro(centroId);
      this.isClicked = true;
      this.router.navigate(['/ajustes/empresa/usuarios-empresa']);
  }


  addCentro() {
    this.srvCentros.setDataEmpresaId(this.Empresa.int_empresa_id);
  }

}
