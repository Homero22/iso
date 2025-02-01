import { Component, OnInit } from '@angular/core';
import { UsuariosEmpresaService } from '../../../data-access/services/usuarios-centro.service';
import { CentroEmpresa } from '../../../data-access/model/centro-empresa';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CentroEmpresaService } from '../../../data-access/services/centro-empresa.service';

@Component({
  selector: 'app-editar-centro',
  templateUrl: './editar-centro.component.html',
  styleUrls: ['./editar-centro.component.css'],
  standalone: true,
  imports:[ReactiveFormsModule, FormsModule]
})
export class EditarCentroComponent implements OnInit {
 centro!: CentroEmpresa;
 centroForm: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private readonly srvUsuarioCentro: UsuariosEmpresaService,
    private readonly srvCentro: CentroEmpresaService
  ) { 
    this.centroForm = this.fb.group({
      int_centro_id: [''],
      str_centro_nombre: [''],
      str_centro_direccion: [''],
      str_centro_telefono: [''],
      int_empresa_id: [''],
    });
  }

  ngOnInit() {
    this.centroForm.reset();
    this.srvUsuarioCentro.dataCentro$.subscribe((centro: CentroEmpresa) => {
      this.centro = centro
      if (this.centro) {
        this.centroForm.patchValue(this.centro);
      }
    });
  }

  editarCentro(){
    this.srvCentro.editarCentroEmpresaGeneral(this.centroForm.value)
  }

  onSubmit(){
    Swal.fire({
      title: '¿Está seguro de editar el centro?',
      showCancelButton: true,
      confirmButtonText: `Guardar`,
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.editarCentro();
      }
    });
  }

}
