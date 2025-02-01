import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import classIcon from '../../../../../config/material-icons';
import { ButtonSecondaryComponent } from '../../../shared/ui/botones/button-secondary/button-secondary.component';
import { MostrarPerfilComponent } from '../../ui/perfil-usuario/mostrar-perfil/mostrar-perfil.component';
import { EditarPerfilComponent } from '../../ui/perfil-usuario/editar-perfil/editar-perfil.component';
import { CommonModule } from '@angular/common';
import { CargandoPerfilComponent } from '../../ui/perfil-usuario/cargando-perfil/cargando-perfil.component';
import { PerfilUsuarioService } from '../../data-access/services/perfil-usuario.service';
import { Subject, takeUntil } from 'rxjs';
import {
  PerfilUsuario,
  PerfilUsuarioModel,
} from '../../data-access/model/perfil-usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [
    CommonModule,
    ButtonSecondaryComponent,
    MostrarPerfilComponent,
    EditarPerfilComponent,
    CargandoPerfilComponent,
  ],
  providers: [PerfilUsuarioService],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css',
})
export class PerfilUsuarioComponent implements OnInit, OnDestroy {
  // Cargar datos
  loading: boolean = true;
  request: boolean = true;

  classIcon: string = classIcon.classIcon;

  isEditing = false;

  usuario: any = {};
  _id: number = 1;

  private readonly destroy$ = new Subject<any>();

  constructor(private readonly srvPerfilUsuario: PerfilUsuarioService) {}

  ngOnInit(): void {
    this.obtenerPerfilUsuario();
  }

  editarPerfil() {
    this.isEditing = true;
  }

  cancelarEdicion() {
    this.isEditing = false;
  }

  guardarCambios(usuarioModificado: PerfilUsuario) {
    // Lógica para guardar los cambios
    this.isEditing = false;

    Swal.fire({
      title: 'Está seguro que desea modificar los datos?',
      showDenyButton: true,
      confirmButtonText: 'Modificar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      Swal.fire({
        title: 'Modificando datos...',
        didOpen: () => {
          Swal.showLoading();
        },
      });
      if (result.isConfirmed) {
        this.srvPerfilUsuario
          .patchPerfilUsuarioByID(this._id, usuarioModificado)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (resp: PerfilUsuarioModel) => {
              if (resp.status) {
                Swal.close();
                Swal.fire({
                  icon: 'success',
                  title: resp.message,
                  showDenyButton: false,
                  confirmButtonText: 'Aceptar',
                });
              } else {
                Swal.close();
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: resp.message,
                  showDenyButton: false,
                  confirmButtonText: 'Aceptar',
                });
              }
            },
            error: (err) => {
              console.error('Error al modificar el perfil del usuario', err);
              Swal.fire(
                'Error!',
                'Ha ocurrido un error al modificar los datos.',
                'error'
              );
              Swal.close();
              Swal.fire({
                title: 'Ha ocurrido un error al modificar los datos',
                text: 'Por favor comuníquese con el servicio técnico',
                icon: 'error',
                footer:
                  'Error: ' +
                  err.error.message +
                  '\n' +
                  (err.error.errores ? JSON.stringify(err.error.errores) : ''),
                showDenyButton: false,
                confirmButtonText: 'Aceptar',
              });
            },
            complete: () => {
              this.obtenerPerfilUsuario();
            },
          });
      } else if (result.isDenied) {
        Swal.fire('Cambios no guardados', '', 'info');
      }
    });
  }

  onGuardar(usuarioModificado: PerfilUsuario) {
    this.guardarCambios(usuarioModificado);
  }

  obtenerPerfilUsuario() {
    this.loading = false;
    this.srvPerfilUsuario.obtenerPerfilUsuario(this._id);

    this.srvPerfilUsuario.SelectPerfilUsuario$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((data) => {
      if (data) {
        this.usuario = data[0];
        this.request = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
