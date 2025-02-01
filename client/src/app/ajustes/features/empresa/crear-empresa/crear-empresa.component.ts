import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators ,  ReactiveFormsModule} from '@angular/forms';
import { CrearEmpresa } from '../../../data-access/model/empresa';
import { AuthStateService } from '../../../../core/data-access/services/auth-state.service';
import { ClienteEmpresaService } from '../../../data-access/services/cliente-empresa.service';

@Component({
  selector: 'app-crear-empresa',
  templateUrl: './crear-empresa.component.html',
  styleUrls: ['./crear-empresa.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class CrearEmpresaComponent {

  empresaForm: FormGroup;
  crearEmpresa : CrearEmpresa;
  id: number;

  constructor(private readonly fb: FormBuilder,
     private readonly clienteLogueado: AuthStateService,
     private readonly srvClienteEmpresa: ClienteEmpresaService

  ) {
    this.empresaForm = this.fb.group({
      dt_fecha_creacion: [new Date().toISOString().slice(0, 10), Validators.required], // Fecha por defecto (hoy)
      str_empresa_direccion: ['', [Validators.required, Validators.maxLength(255)]],
      str_empresa_email: ['', [Validators.required, Validators.email]],
      str_empresa_nombre: ['', [Validators.required, Validators.maxLength(100)]],
      str_empresa_telefono: ['', [Validators.required, Validators.pattern(/^\d{7,10}$/)]],
    });

    this.id = this.clienteLogueado.int_cliente_id;


    this.crearEmpresa = {
      str_empresa_direccion: '',
      str_empresa_email: '',
      str_empresa_nombre: '',
      str_empresa_telefono: '',
      dt_fecha_creacion: '',
      int_cliente_id: 0
    };
  }

  onSubmit() {
    if (this.empresaForm.valid) {
      //añadir el id del cliente logueado
      this.crearEmpresa = this.empresaForm.value;
      this.crearEmpresa.int_cliente_id = this.id;

      // guardar empresa

      this.srvClienteEmpresa.crearEmpresa(this.crearEmpresa)
    }
  }

}
 