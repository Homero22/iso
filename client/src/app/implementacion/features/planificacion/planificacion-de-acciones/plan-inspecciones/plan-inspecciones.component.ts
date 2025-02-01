import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { PlanInspeccionesService } from '../../../../data-access/services/planInspecciones.service';
import {
  Accion,
  PlanInspecciones,
} from '../../../../data-access/model/planInspecciones';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import classIcon from '../../../../../../../config/material-icons';
import { ButtonBackComponent } from '../../../../../shared/ui/botones/button-back/button-back.component';
import { ButtonSaveComponent } from '../../../../../shared/ui/botones/button-save/button-save.component';
import { ButtonAddComponent } from '../../../../../shared/ui/botones/button-add/button-add.component';
import { ButtonDeleteComponent } from '../../../../../shared/ui/botones/button-delete/button-delete.component';
import { ButtonEditComponent } from '../../../../../shared/ui/botones/button-edit/button-edit.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plan-inspecciones',
  templateUrl: './plan-inspecciones.component.html',
  styleUrls: ['./plan-inspecciones.component.css'],
  imports: [
    FormsModule,
    CommonModule,
    ButtonBackComponent,
    ButtonSaveComponent,
    ButtonAddComponent,
    ButtonDeleteComponent,
    ButtonEditComponent,
  ],
  standalone: true,
})
export class PlanInspeccionesComponent implements OnInit {
  private readonly destroy$ = new Subject<any>();
  classIcon = classIcon.classIcon;
  viewPdf: boolean = false; // Estado para alternar entre vistas
  pdfUrl: any; // URL segura para mostrar el PDF
  data!: PlanInspecciones;
  registrando: boolean = false;
  pdfGenerated: boolean = false;
  agregarAccion: boolean = false;
  constructor(
    private readonly srvPlanInspecciones: PlanInspeccionesService,
    private readonly sanitizer: DomSanitizer
  ) {}

  minDate!: string;
  maxDate!: string;
  selectedMonth: string | null = null; // Mes seleccionado
  fecha: string | null = null; // Variable vinculada al campo de fecha
  errorMessage: string | null = null; // Mensaje de error para validación

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    console.log(currentYear);
    this.minDate = `${currentYear}-01-01`; // Primer día del año actual
    this.maxDate = `${currentYear}-12-31`; // Último día del año actual
  }
  empezarRegistro(): void {
    this.registrando = true; // Cambiar el estado para habilitar el formulario
  }
  getEficaciaClass(indicador: number): string {
    if (indicador === 100) {
      return 'bg-green-500';
    } else if (indicador === 0) {
      return 'bg-red-500';
    } else {
      return 'bg-yellow-500'; // Intermediate color
    }
  }

  getData(): PlanInspecciones {
    this.data = {
      acciones: this.rows,
      codigo: 'SST-2025-001',
      fecha_elaboracion: '2025-01-01',
      fecha_edicion: '2025-02-01',
      responsable_sst: 'Juan Pérez',
      empresa: 'Empresa Ficticia S.A.',
      elaborado_por: 'Juan Pérez',
      revisado_por: 'María Gómez',
      aprobado_por: 'Carlos Rodríguez',
      firma_elaborador: 'https://picsum.photos/seed/picsum/200/300',
      firma_revisor: 'https://picsum.photos/seed/picsum/200/300',
      firma_aprobador: 'https://picsum.photos/seed/picsum/200/300',
      indice_eficacia: 100,
    };
    return this.data;
  }

  rows: Accion[] = [
    {
      descripcion: 'Descripción 1',
      recursos: 'Recursos 1',
      responsable: 'Responsable 1',
      fechas_compromiso: ['2025-02-02', '2025-02-02', '2025-02-02'],
      criterios_exito: 'Criterios de éxito 1',
      metodos: 'Métodos de evaluación 1',
      alcance: 'Alcance 1',
      acciones_realizadas: 4,
      acciones_planificadas: 5,
      indicador_eficacia: 80,
      fecha_revision_efectividad: '2025-12-01',
      accion_revision: 'Acción de revisión 1',
      responsable_revision: 'Responsable de la revisión 1',
    },
    {
      descripcion: 'Descripción 2',
      recursos: 'Recursos 2',
      responsable: 'Responsable 2',
      fechas_compromiso: ['2025-01-01', '2025-02-01', '2025-03-01'],
      criterios_exito: 'Criterios de éxito 2',
      metodos: 'Métodos de evaluación 2',
      alcance: 'Alcance 2',
      acciones_realizadas: 1,
      acciones_planificadas: 1,
      indicador_eficacia: 100,
      fecha_revision_efectividad: '2025-12-01',
      accion_revision: 'Acción de revisión 2',
      responsable_revision: 'Responsable de la revisión 2',
    },
    {
      descripcion: 'Descripción 2',
      recursos: 'Recursos 2',
      responsable: 'Responsable 2',
      fechas_compromiso: ['2025-01-01', '2025-02-01', '2025-03-01'],
      criterios_exito: 'Criterios de éxito 2',
      metodos: 'Métodos de evaluación 2',
      alcance: 'Alcance 2',
      acciones_realizadas: 0,
      acciones_planificadas: 0,
      indicador_eficacia: 0,
      fecha_revision_efectividad: '2025-12-01',
      accion_revision: 'Acción de revisión 2',
      responsable_revision: 'Responsable de la revisión 2',
    },
  ];

  newRow: Accion = {
    descripcion: '',
    recursos: '',
    responsable: '',
    fechas_compromiso: [],
    criterios_exito: '',
    metodos: '',
    alcance: '',
    acciones_realizadas: 0,
    acciones_planificadas: 0,
    indicador_eficacia: 0,
    fecha_revision_efectividad: '',
    accion_revision: '',
    responsable_revision: '',
  };

  calcularIndicadorEficacia(accion: Accion): void {
    // Validar que las acciones planificadas sean mayor o igual a 0
    if (accion.acciones_planificadas < 0) {
      accion.acciones_planificadas = 0;
    }

    // Si no hay acciones planificadas, el indicador de eficacia debe ser 0
    if (accion.acciones_planificadas === 0) {
      accion.indicador_eficacia = 0;
      return;
    }

    // Controlar que las acciones realizadas estén dentro del rango válido
    if (accion.acciones_realizadas < 0) {
      accion.acciones_realizadas = 0;
    }
    if (accion.acciones_realizadas > accion.acciones_planificadas) {
      accion.acciones_realizadas = accion.acciones_planificadas;
    }

    // Calcular el indicador de eficacia
    accion.indicador_eficacia = Math.round(
      (accion.acciones_realizadas / accion.acciones_planificadas) * 100
    );
  }

  //calcular el índice de eficacia del plan de inspecciones
  calcularIndiceEficacia(): void {
    let totalAccionesRealizadas = 0;
    let totalAccionesPlanificadas = 0;
    this.rows.forEach((row) => {
      totalAccionesRealizadas += row.acciones_realizadas;
      totalAccionesPlanificadas += row.acciones_planificadas;
    });
    this.data.indice_eficacia =
      (totalAccionesRealizadas / totalAccionesPlanificadas) * 100;
  }

  editIndex: number | null = null;
  // Agregar fila
  addRow(event: Event): void {
    event.preventDefault();
    if (this.editIndex !== null) {
      this.rows[this.editIndex] = { ...this.newRow };
      this.editIndex = null;
    } else {
      this.rows.push({ ...this.newRow });
    }

    this.registrando = false;
  }

  // Editar fila
  editRow(index: number): void {
    this.registrando = true;
    this.newRow = { ...this.rows[index] };
    this.editIndex = index;
  }

  // Eliminar fila
  deleteRow(index: number): void {
    this.rows.splice(index, 1);
  }

  resetForm(): void {
    this.newRow = {
      descripcion: '',
      recursos: '',
      responsable: '',
      fechas_compromiso: [],
      criterios_exito: '',
      metodos: '',
      alcance: '',
      acciones_realizadas: 0,
      acciones_planificadas: 0,
      indicador_eficacia: 0,
      fecha_revision_efectividad: '',
      accion_revision: '',
      responsable_revision: '',
    };
  }

  cancelarRegistro(): void {
    this.resetForm();
    this.registrando = false;
  }
  mostrarTabla(): void {
    this.viewPdf = false;
  }

  // Generar PDF
  pdfSanitizado(): void {
    Swal.fire({
      title: 'Generando PDF',
      text: 'Espere un momento por favor...',
      icon: 'info',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    this.srvPlanInspecciones
      .generarPlanInspeccion(this.getData())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          const file = new Blob([data], { type: 'application/pdf' });
          this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            window.URL.createObjectURL(file)
          );
          this.viewPdf = true;
          this.pdfGenerated = true;
          Swal.close();
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  volver(): void {
    this.viewPdf = false; // Cambiar de vuelta a la vista principal
  }

  addFechaCompromiso(): void {
    if (this.fecha) {
      if (this.newRow.fechas_compromiso.includes(this.fecha)) {
        // Validación: Fecha duplicada
        this.errorMessage = `La fecha ${this.fecha} ya está en la lista.`;
      } else {
        // Agregar fecha al arreglo
        this.newRow.fechas_compromiso.push(this.fecha);
        this.errorMessage = null; // Limpiar mensaje de error
      }
      // Limpiar el input de fecha después de agregar
      this.fecha = null;
    }
  }

  removeFecha(index: number, event: MouseEvent): void {
    event.preventDefault();
    // Eliminar una fecha específica del arreglo
    this.newRow.fechas_compromiso.splice(index, 1);
  }
}
