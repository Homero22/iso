import { Component, OnInit } from '@angular/core';
import { ClienteEmpresaService } from '../../../data-access/services/cliente-empresa.service';
import { Subject, takeUntil } from 'rxjs';
import { Empresa } from '../../../data-access/model/empresa';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.css'],
  imports: [ReactiveFormsModule],

standalone: true,
})
export class EditarEmpresaComponent implements OnInit {
  private readonly destroy$ = new Subject<any>();

  empresa!: Empresa

  empresaForm!: FormGroup;

  constructor(
    private clienteEmpresaService: ClienteEmpresaService,
    private fb: FormBuilder
  ) {
    this.empresaForm = this.fb.group({
      dt_fecha_creacion: [{ value: '', disabled: true}], // Campo no editable
      int_empresa_id: [{ value: '', disabled: true }], // Campo no editable
      str_empresa_direccion: ['', [Validators.required, Validators.maxLength(255)]],
      str_empresa_email: [{ value: '', disabled: true }], // Campo no editable
      str_empresa_nombre: ['', [Validators.required, Validators.maxLength(100)]],
      str_empresa_telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{7,10}$/)]],
    });
   }

  ngOnInit() {

    //obtengo la empresa a editar
    this.clienteEmpresaService.selectUpdateEmpresa$.pipe(takeUntil(this.destroy$)).subscribe((empresa: Empresa) => {
      this.empresa = empresa;

    }
    );

    if (this.empresa) {
      this.empresaForm.patchValue(this.empresa);
    }

  }

  editarEmpresa() {
    Swal.fire({
      title: '¿Estás seguro de editar la empresa?',
      showCancelButton: true,
      confirmButtonText: `Editar`,
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteEmpresaService.editarEmpresa(this.empresaForm.value, this.empresa.int_empresa_id);
      }
    });
   
  }



}