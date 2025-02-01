import { Component } from '@angular/core';
import { ClienteEmpresaService } from '../../data-access/services/cliente-empresa.service';
import { Empresa } from '../../data-access/model/empresa';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ButtonSearchComponent } from '../../../shared/ui/botones/button-search/button-search.component';
import { SinDatosComponent } from '../../../shared/ui/sin-datos/sin-datos.component';
import classIcon from '../../../../../config/material-icons';
import { ModalService } from '../../../shared/data-access/services/modal.service';
import { Router, RouterOutlet } from '@angular/router';
import { UsuariosEmpresaService } from '../../data-access/services/usuarios-centro.service';
import { ButtonModalComponent } from '../../../shared/ui/botones/button-modal/button-modal.component';
import { PerfilUsuarioService } from '../../data-access/services/perfil-usuario.service';
import { CentrosEmpresaComponent } from '../centros-empresa/centros-empresa.component';
import { ButtonBackComponent } from "../../../shared/ui/botones/button-back/button-back.component";
import { CentroEmpresaService } from '../../data-access/services/centro-empresa.service';

@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    ButtonSearchComponent,
    SinDatosComponent,
    ButtonModalComponent,
    CentrosEmpresaComponent,
    ButtonBackComponent
],
  templateUrl: './empresa.component.html',
  styleUrl: './empresa.component.css',
})
export class EmpresaComponent {
  titulo: string = 'Empresas';
  empresas: Empresa[] = [];
  existData: boolean = false;
  idEmpresa: number = 0;  
  isClicked: boolean = false;
  verCentros: boolean = false;
  empresa!: Empresa 

  constructor(
    private readonly clienteEmpresaService: ClienteEmpresaService,
    private readonly srvModal: ModalService,
    private readonly srvUsuarioEmpresa: UsuariosEmpresaService,
    private readonly srvPerfilUsuario: PerfilUsuarioService,
    private readonly router: Router,
    private readonly srvCentros: CentroEmpresaService
  ) {}

  classIcon = classIcon.classIcon;

  ngOnInit() {
    this.clienteEmpresaService.obtenerEmpresasByIdCliente(1);
    this.clienteEmpresaService.empresas$.subscribe((empresas: Empresa[]) => {
      this.empresas = empresas;
      if (this.empresas.length > 0) {
        this.existData = true;
      }
    });

 
    this.srvPerfilUsuario.SelectIsClicked$.subscribe((isClicked: boolean) => {
      this.isClicked = isClicked;
    });
   
  }


  editarEmpresa(empresa: Empresa) {
    this.clienteEmpresaService.updateEmpresa(empresa);
    this.srvModal.setFormModal({
      formulario: 'editarEmpresa',
      title: 'Editar Empresa',
    });
    this.srvModal.openModal();
  }
  verUsuarios(empresaId: number,  empresa: Empresa) {
    this.srvUsuarioEmpresa.setDataEmpresa(empresa);
    this.srvUsuarioEmpresa.obtenerUsuariosCentro(empresaId);
    this.router.navigate(['/ajustes/empresa/usuarios-empresa']);
    
    this.isClicked = true;
  }

  regresar() {
    this.isClicked = false;
  }
  

  verCentrosEmpresa(empresa: Empresa) {
    this.srvCentros.obtenerCentrosEmpresaByEmpresaIdAsync(empresa.int_empresa_id);
    this.empresa = empresa;
    this.verCentros = true;
  }

  verEmpresas() {
    this.verCentros = false;
  }
}
