import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RolService } from '../../../data-access/services/rol.service';
import { Subject, takeUntil } from 'rxjs';
import { Rol } from '../../../data-access/model/rol';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-rol',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar-rol.component.html',
  styleUrl: './editar-rol.component.css'
})
export class EditarRolComponent {
  private readonly destroy$ = new Subject<any>();
 rolForm: FormGroup;
 rol!: Rol;
 
   constructor(private fb: FormBuilder,
     private srvRol: RolService
   ) {
     this.rolForm = this.fb.group({
       str_rol_nombre: ['', [Validators.required, Validators.maxLength(100)]],
       str_rol_descripcion: ['', [Validators.required, Validators.maxLength(255)]],
       str_rol_estado: [{ value: '', disabled: true }, [Validators.required]],
     });

     this.srvRol.selectUpdateRol$.pipe(takeUntil(this.destroy$)).subscribe((rol: Rol) => {
       this.rolForm.patchValue(rol);
        this.rol = rol;

     });
 
   }

   editarRol() {
    Swal.fire({
      title: '¿Estás seguro de editar el rol?',
      showCancelButton: true,
      confirmButtonText: `Editar`,
      cancelButtonText: `Cancelar`,
    }).then((result) => {
        if (result.isConfirmed) {
          this.srvRol.editarRol(this.rolForm.value , this.rol.int_rol_id);
        }
    }
    );
  }

}
