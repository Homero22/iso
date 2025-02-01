import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Empresa } from '../ajustes/data-access/model/empresa';
import classIcon from '../../../config/material-icons';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ClienteEmpresaService } from '../ajustes/data-access/services/cliente-empresa.service';
import { SinDatosComponent } from '../shared/ui/sin-datos/sin-datos.component';
import config from '../../../config/config';
import { PlanCapacitacionComponent } from "../implementacion/features/planificacion/planificacion-de-acciones/plan-capacitacion/plan-capacitacion.component";
import { PlanInspeccionesComponent } from "../implementacion/features/planificacion/planificacion-de-acciones/plan-inspecciones/plan-inspecciones.component";
import { PlanTrabajoComponent } from "../implementacion/features/planificacion/planificacion-de-acciones/plan-trabajo/plan-trabajo.component";
import { PlanMedicionHigieneComponent } from "../implementacion/features/planificacion/planificacion-de-acciones/plan-medicion-higiene/plan-medicion-higiene.component";
import { InspeccionCondicionesSeguridadComponent } from "../implementacion/features/planificacion/planificacion-de-acciones/plan-inspecciones/inspeccion-condiciones-seguridad/inspeccion-condiciones-seguridad.component";
import { StepperFormComponent } from "../implementacion/features/planificacion/planificacion-de-acciones/plan-inspecciones/stepperForm/stepperForm.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, SinDatosComponent, PlanTrabajoComponent, PlanMedicionHigieneComponent, InspeccionCondicionesSeguridadComponent, StepperFormComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit, OnDestroy {
  request = true;
  loading = true;

  baseUrl = config.URL_BASE_PATH;

  private readonly destroy$ = new Subject<any>();
  classIcon = classIcon.classIcon;

  isClicked: boolean = false;
  empresas: Empresa[] = [];
  empresaResumen!: Empresa;

  constructor(private readonly clienteEmpresaService: ClienteEmpresaService) {}

  ngOnInit() {
    this.clienteEmpresaService.obtenerEmpresasByIdCliente(1);
    this.clienteEmpresaService.empresas$.subscribe((empresas: Empresa[]) => {
      this.empresas = empresas;
      if (this.empresas.length > 0) {
        this.request = false;
        this.loading = false;
      }
    });
  }

  resultadoAuditoria(empresa: Empresa) {
    this.empresaResumen = empresa;
    this.isClicked = true;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
