import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import Swal from 'sweetalert2';
import { PerfilUsuarioService } from '../../../data-access/services/perfil-usuario.service';
import { Subject, takeUntil } from 'rxjs';
import { NuevaClaveModel } from '../../../data-access/model/perfil-usuario';
import { ModalService } from '../../../../shared/data-access/services/modal.service';
@Component({
  selector: 'app-nueva-clave',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './nueva-clave.component.html',
  styleUrl: './nueva-clave.component.css',
})
export class NuevaClaveComponent implements OnInit, OnDestroy {
  @Input() data: any;

  myForm!: FormGroup;

  private readonly destroy$ = new Subject<any>();

  constructor(
    private readonly fb: FormBuilder,
    public readonly srvPerfilUsuario: PerfilUsuarioService,
    private readonly srvModal: ModalService
  ) {
    this.myForm = this.fb.group({
      int_usuario_id: 0,
      str_usuario_clave: [null, [Validators.required]],
      str_usuario_nueva_clave: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.myForm.patchValue({ int_usuario_id: this.data.int_usuario_id });
  }

  actualizarContrasena() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas actualizar tu contraseña?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Acualizar contraseña',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Modificando Contraseña...',
          didOpen: () => {
            Swal.showLoading();
          },
        });

        this.srvPerfilUsuario
          .postCambiarClave(this.myForm.value)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (resp: NuevaClaveModel) => {
              if (resp.status) {
                Swal.close();
                Swal.fire({
                  icon: 'success',
                  title: `Contraseña actualizada correctamente`,
                  showDenyButton: false,
                  confirmButtonText: 'Aceptar',
                });

                this.myForm.reset();
                this.srvModal.closeModal();
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
            error: (err: any) => {
              Swal.close();
              Swal.fire({
                title: 'Error al actualizar la contraseña',
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
          });
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
