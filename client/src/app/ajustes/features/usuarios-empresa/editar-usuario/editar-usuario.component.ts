import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UsuarioCentro } from '../../../data-access/model/usuario-centro';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsuariosEmpresaService } from '../../../data-access/services/usuarios-centro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
  imports: [ReactiveFormsModule],
  standalone: true,
})
export class EditarUsuarioComponent implements OnInit {
  private readonly destroy$ = new Subject<any>();

  usuarioEmpresa!: UsuarioCentro;
  usuarioEmpresaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private srvUsuarioEmpresa: UsuariosEmpresaService
  ) {
    this.usuarioEmpresaForm = this.fb.group({
      int_usuario_id: [{ value: ''}],
      str_usuario_nombres: [''],
      str_usuario_apellidos: [''],
      str_usuario_email: [{ value: '', disabled: true }],
      str_usuario_cedula: [''],
      str_usuario_telefono: [''],
      // str_usuario_estado: [''],
      // str_usuario_tipo: [''],
      // str_usuario_clave: [''],
      dt_usuario_fecha_registro: [{ value: '', disabled: true }],
      dt_fecha_creacion: [{ value: '', disabled: true }],
      dt_fecha_actualizacion: [{ value: '', disabled: true }],
      int_usuario_sistema_empresa_id: [{ value: '', disabled: true }],
      int_rol_id: [{ value: '', disabled: true }],
      str_rol_nombre: [{ value: '', disabled: true }],
      int_empresa_id: [{ value: '', disabled: true }],
    });
  }

  ngOnInit() {
    this.usuarioEmpresaForm.reset();
    // obtengo el usuario a editar
    this.obtenerData();

  }

  obtenerData(){
    this.srvUsuarioEmpresa.selectUpdateUsuario$
      .pipe(takeUntil(this.destroy$)).subscribe((usuario: UsuarioCentro) => {
        if(usuario){
          this.usuarioEmpresa = usuario;
          if (this.usuarioEmpresa) {
            this.usuarioEmpresaForm.patchValue(this.usuarioEmpresa);
          }
        }
      }
      );


  }

  editarUsuario() {
    Swal.fire({
      title: '¿Estás seguro de editar el usuario?',
      showCancelButton: true,
      confirmButtonText: `Editar`,
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.srvUsuarioEmpresa.editarUsuarioEmpresa(this.usuarioEmpresaForm.value, this.usuarioEmpresa.int_usuario_id, this.usuarioEmpresa.int_empresa_id);
      }
    });

   
  }

}
