import { Component, OnInit } from '@angular/core';
import { CentroEmpresaService } from '../../../data-access/services/centro-empresa.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrearCentroEmpresa } from '../../../data-access/model/centro-empresa';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-crear-centro',
  templateUrl: './crear-centro.component.html',
  styleUrls: ['./crear-centro.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
})
export class CrearCentroComponent implements OnInit {
  centroForm: FormGroup;
  crearCentro: CrearCentroEmpresa;
  idEmpresa: number = 0;
   private readonly destroy$ = new Subject<any>();
  constructor(
    private readonly srvCentros: CentroEmpresaService,
    private readonly fb: FormBuilder
  ) {
    this.centroForm = this.fb.group({
      str_centro_nombre: ['', [Validators.required, Validators.maxLength(100)]],
      str_centro_direccion: ['', [Validators.required, Validators.maxLength(255)]],
      str_centro_telefono: ['', [Validators.required, Validators.pattern(/^\d{7,10}$/)]],
     
    });

    this.crearCentro = {
      str_centro_nombre: '',
      str_centro_direccion: '',
      str_centro_telefono: '',
      int_empresa_id: 0,

    };

   }

  ngOnInit() {
    console.log('ngOnInit');
    this.srvCentros.dataEmpresaId$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.idEmpresa = data;
      console.log('idEmpresa', this.idEmpresa);
    });
  }

  onSubmit() {
    if(this.centroForm.valid) {
      this.crearCentro = this.centroForm.value;
      this.crearCentro.int_empresa_id = this.idEmpresa;
      this.srvCentros.crearCentroEmpresaGeneral(this.crearCentro);
    }
    

  }

}
