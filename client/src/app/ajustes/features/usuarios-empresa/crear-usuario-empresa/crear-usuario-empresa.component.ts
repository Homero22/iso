import { Component, OnInit } from '@angular/core';
import { UsuarioCentro } from '../../../data-access/model/usuario-centro';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosEmpresaService } from '../../../data-access/services/usuarios-centro.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { Empresa } from '../../../data-access/model/empresa';
import { Rol } from '../../../data-access/model/rol';
import { RolService } from '../../../data-access/services/rol.service';
import { CentroEmpresa } from '../../../data-access/model/centro-empresa';

@Component({
  selector: 'app-crear-usuario-empresa',
  templateUrl: './crear-usuario-empresa.component.html',
  styleUrls: ['./crear-usuario-empresa.component.css'],
  imports: [ReactiveFormsModule],
  standalone: true,
})
export class CrearUsuarioEmpresaComponent {
    private readonly destroy$ = new Subject<any>();
  
    usuarioEmpresa!: UsuarioCentro;
    usuarioEmpresaForm!: FormGroup;
    empresa!: Empresa;
    centro!: CentroEmpresa;
    roles:Rol[] = [];

  constructor(private fb: FormBuilder,
    private readonly srvUsuarioEmpresa: UsuariosEmpresaService,
    private readonly  srvRol: RolService
  ) { 
    this.usuarioEmpresaForm = this.fb.group({
      str_usuario_nombres: ['', Validators.required],
      str_usuario_apellidos: ['', Validators.required],
      str_usuario_email: ['', [Validators.required, Validators.email]],
      str_usuario_cedula: ['', [Validators.required]],
      str_usuario_telefono: [''],
      str_usuario_estado: ['ACTIVO', [Validators.required]],
      str_usuario_tipo: [''],
      str_usuario_clave: [''],
      int_rol_id: ['', Validators.required],
      int_empresa_id: ['', Validators.required],
      str_empresa_nombre: ['', Validators.required],
      int_sistema_id: [], 
      int_centro_id: ['', Validators.required],
      str_centro_nombre: ['', Validators.required], 
    });

    this.srvUsuarioEmpresa.dataEmpresa$.subscribe((empresa: Empresa) => {
      this.empresa = empresa;
    });
    this.srvUsuarioEmpresa.dataCentro$.subscribe((centro: CentroEmpresa) => {
      this.centro = centro;
    });

    //agreggo el id y nombre de la empresa al formulario
    this.usuarioEmpresaForm.patchValue({int_centro_id: this.centro.int_centro_id});
    this.usuarioEmpresaForm.patchValue({str_empresa_nombre: this.empresa.str_empresa_nombre});
    this.usuarioEmpresaForm.patchValue({str_centro_nombre: this.centro.str_centro_nombre});
    this.usuarioEmpresaForm.patchValue({int_empresa_id: this.empresa.int_empresa_id});

    this.usuarioEmpresaForm.patchValue({int_sistema_id: 1});

    //obtengo los roles
    this.srvRol.obtenerRoles();
    this.srvRol.roles$.subscribe((roles: Rol[]) => {
      this.roles = roles;
    });

  }


  crearUsuario() {
    //AGREGO int_sistema_id al formulario
    console.log

    if(this.usuarioEmpresaForm.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor complete todos los campos',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return
    }

    Swal.fire({
      title: '¿Estás seguro de crear el usuario?',
      showCancelButton: true,
      confirmButtonText: `Crear`,
      cancelButtonText: `Cancelar`,
    }).then((result) => {
        if (result.isConfirmed) {
          this.srvUsuarioEmpresa.crearUsuarioEmpresa(this.usuarioEmpresaForm.value);
        }
    }
    );
  }

  getCamposInvalidos() {
    const invalidFields: string[] = [];
    Object.keys(this.usuarioEmpresaForm.controls).forEach((field) => {
      const control = this.usuarioEmpresaForm.get(field);
      if (control && control.invalid) {
        invalidFields.push(field);
      }
    });
    return invalidFields;
  }
  

}
