import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ModalService } from '../../data-access/services/modal.service';
import { CommonModule } from '@angular/common';
import { EditarEmpresaComponent } from '../../../ajustes/features/empresa/editar-empresa/editar-empresa.component';
import { CrearEmpresaComponent } from '../../../ajustes/features/empresa/crear-empresa/crear-empresa.component';
import { NuevaClaveComponent } from '../../../ajustes/ui/perfil-usuario/nueva-clave/nueva-clave.component';
import { EditarUsuarioComponent } from '../../../ajustes/features/usuarios-empresa/editar-usuario/editar-usuario.component';
import { CrearUsuarioEmpresaComponent } from "../../../ajustes/features/usuarios-empresa/crear-usuario-empresa/crear-usuario-empresa.component";
import { EditarRolComponent } from "../../../ajustes/features/rol/editar-rol/editar-rol.component";
import { CrearRolComponent } from "../../../ajustes/features/rol/crear-rol/crear-rol.component";
import { CrearCentroComponent } from "../../../ajustes/features/centros-empresa/crear-centro/crear-centro.component";
import { EditarCentroComponent } from "../../../ajustes/features/centros-empresa/editar-centro/editar-centro.component";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule,
    EditarEmpresaComponent,
    CrearEmpresaComponent,
    NuevaClaveComponent,
    EditarUsuarioComponent,
    CrearUsuarioEmpresaComponent,
    EditarRolComponent,
    CrearRolComponent,
    CrearCentroComponent,
    EditarCentroComponent
],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<any>();

  constructor(private readonly srvModal: ModalService) {}

  public tipoFormulario: string = '';
  public titleModal: string = '';
  public data: any = {};

  ngOnInit(): void {
    this.srvModal.selectFormModal$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.tipoFormulario = data.formulario;
        this.titleModal = data.title;
        this.data = data.data;
      });
  }

  cerrarModal() {
    localStorage.clear();
    this.srvModal.closeModal();
    this.tipoFormulario = 'clear';
    this.titleModal = '';
    this.srvModal.openModal();
    this.srvModal.closeModal();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
