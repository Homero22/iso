import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlanCapacitacionComponent } from "./plan-capacitacion/plan-capacitacion.component";
import { PlanInspeccionesComponent } from "./plan-inspecciones/plan-inspecciones.component";
import { PlanTrabajoComponent } from "./plan-trabajo/plan-trabajo.component";


@Component({
  selector: 'app-planificacion-de-acciones',
  standalone: true,
  imports: [PlanCapacitacionComponent, PlanInspeccionesComponent, PlanTrabajoComponent],
  templateUrl: './planificacion-de-acciones.component.html',
  styleUrl: './planificacion-de-acciones.component.css',
})
export class PlanificacionDeAccionesComponent {
  constructor(private readonly router: Router) {
    console.log('PlanificacionDeAccionesComponent', router.url);
  }

  selectedTab: number = 0; // Tab seleccionado por defecto
  tabs = [
    { label: 'Plan de Capacitación' },
    { label: 'Plan de Inspecciones' },
    { label: 'Plan de Trabajo' },
  ];

  selectTab(index: number): void {
    this.selectedTab = index;
  }
}
