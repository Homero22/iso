import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { RolService } from '../../../data-access/services/rol.service';
@Component({
  selector: 'app-crear-rol',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-rol.component.html',
  styleUrl: './crear-rol.component.css'
})
export class CrearRolComponent {
rolForm: FormGroup;

  constructor(private fb: FormBuilder,
    private srvRol: RolService
  ) {
    this.rolForm = this.fb.group({
      str_rol_nombre: ['', [Validators.required, Validators.maxLength(100)]],
      str_rol_descripcion: ['', [Validators.required, Validators.maxLength(255)]],
      str_rol_estado: [{ value: 'ACTIVO', disabled: true }, [Validators.required]],
    });

  }



  onSubmit() {
    this.srvRol.crearRol(this.rolForm.value);
  }



}
