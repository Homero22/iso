import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  PlanCapacitaciones,
  Temas,
} from '../../../../data-access/model/planCapacitacion';
import { PlanCapacitacionService } from '../../../../data-access/services/planCapacitacion.service';
import { Subject, takeUntil } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import classIcon from '../../../../../../../config/material-icons';
import Swal from 'sweetalert2';
import { ButtonSaveComponent } from '../../../../../shared/ui/botones/button-save/button-save.component';
import { ButtonBackComponent } from '../../../../../shared/ui/botones/button-back/button-back.component';
import { CommonModule } from '@angular/common';
import { ButtonAddComponent } from '../../../../../shared/ui/botones/button-add/button-add.component';
import { ButtonDeleteComponent } from '../../../../../shared/ui/botones/button-delete/button-delete.component';
import { ButtonEditComponent } from '../../../../../shared/ui/botones/button-edit/button-edit.component';

@Component({
  selector: 'app-plan-capacitacion',
  templateUrl: './plan-capacitacion.component.html',
  styleUrls: ['./plan-capacitacion.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonSaveComponent,
    ButtonBackComponent,
    ButtonAddComponent,
    ButtonDeleteComponent,
    ButtonEditComponent,
  ],
})
export class PlanCapacitacionComponent {
  private readonly destroy$ = new Subject<any>();
  classIcon = classIcon.classIcon;
  viewPdf: boolean = false; // Estado para alternar entre vistas
  pdfUrl: any; // URL segura para mostrar el PDF
  // Datos
  data!: PlanCapacitaciones;
  registrando: boolean = false;
  pdfGenerated: boolean = false;
  agregarAccion: boolean = false;

  constructor(
    private readonly srvPlanCapacitaciones: PlanCapacitacionService,
    private readonly sanitizer: DomSanitizer
  ) {}

  minDate!: string;
  maxDate!: string;
  selectedMonth: string | null = null; // Mes seleccionado
  fecha: string | null = null; // Variable vinculada al campo de fecha
  errorMessage: string | null = null; // Mensaje de error para validación

  empezarRegistro(): void {
    this.registrando = true; // Cambiar el estado para habilitar el formulario
  }

  limitarCaracteres(texto: string, limite: number): string {
    if (texto.length > limite) {
      return texto.substring(0, limite) + '...';
    }
    return texto;
  }

  getData(): PlanCapacitaciones {
    //lleno los datos
    this.data = {
      temas: this.rows,
      codigo: 'SST-2025-001',
      fecha_revision: '2025-02-01',
      fecha_elaboracion: '2025-01-01',
      total_participantes: 20,
      total_horas: 8,
      elaborado_por: 'Juan Pérez',
      revisado_por: 'María Gómez',
      aprobado_por: 'Carlos Rodríguez',
      empresa: 'Empresa Ficticia S.A.',
      firma_elaborador: 'https://picsum.photos/seed/picsum/200/300',
      firma_revisor: 'https://picsum.photos/seed/picsum/200/300',
      firma_aprobador: 'https://picsum.photos/seed/picsum/200/300',
      total_presupuesto: 1000,
      promedio_indice_eficacia: 100,
      anio: 2025,
    };
    return this.data;
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

  // Datos de ejemplo
  rows: Temas[] = [
    {
      tema: 'Ergonomía Laboral. Medidas de prevención en oficinas y home office',
      objetivo:
        'Difundir medidas de prevención para controlar los riesgos disergonómicos',
      dirigido_a: 'Todos los trabajadores de las Bases de ABPU',
      instructor: 'MSc. Julio Pambabay',
      recursos:
        'Instructor, proyector, pizarrón, sala de capacitación, marcadores, leyes, reglamentos, plataforma virtual',
      duracion_horas: 1,
      numero_participantes: 1,
      mes: 'Enero',
      presupuesto: 100,
      indicador: 'Indicador 1',
      acciones_realizadas: 1,
      acciones_planificadas: 1,
      responsable: 'Responsable 1',
      indice_eficacia: 100,
    },
    {
      tema: 'Tema 2',
      objetivo: 'Objetivo 2',
      dirigido_a: 'Dirigido a 2',
      instructor: 'Instructor 2',
      recursos: 'Recursos 2',
      duracion_horas: 2,
      numero_participantes: 2,
      mes: 'Febrero',
      presupuesto: 200,
      indicador: 'Indicador 2',
      acciones_realizadas: 1,
      acciones_planificadas: 2,
      responsable: 'Responsable 2',
      indice_eficacia: 50,
    },
    {
      tema: 'Tema 3',
      objetivo: 'Objetivo 3',
      dirigido_a: 'Dirigido a 3',
      instructor: 'Instructor 3',
      recursos: 'Recursos 3',
      duracion_horas: 3,
      numero_participantes: 3,
      mes: 'Marzo',
      presupuesto: 300,
      indicador: 'Indicador 3',
      acciones_realizadas: 0,
      acciones_planificadas: 0,
      responsable: 'Responsable 3',
      indice_eficacia: 0,
    },
  ];
  newRow: Temas = {
    tema: '',
    objetivo: '',
    dirigido_a: '',
    instructor: '',
    recursos: '',
    duracion_horas: 0,
    numero_participantes: 0,
    mes: '',
    presupuesto: 0,
    indicador: '',
    acciones_realizadas: 0,
    acciones_planificadas: 0,
    responsable: '',
    indice_eficacia: 0,
  };

  editIndex: number | null = null;
  calcularIndicadorEficacia(accion: Temas): void {
    // Validar que las acciones planificadas sean mayor o igual a 0
    if (accion.acciones_planificadas < 0) {
      accion.acciones_planificadas = 0;
    }

    // Si no hay acciones planificadas, el indicador de eficacia debe ser 0
    if (accion.acciones_planificadas === 0) {
      accion.indice_eficacia = 0;
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
    accion.indice_eficacia = Math.round(
      (accion.acciones_realizadas / accion.acciones_planificadas) * 100
    );
  }

  cancelarRegistro(): void {
    this.resetForm();
    this.registrando = false;
  }
  mostrarTabla(): void {
    this.viewPdf = false;
  }

  // Agregar fila
  addRow(event: Event): void {
    event.preventDefault();
    if (this.editIndex !== null) {
      this.rows[this.editIndex] = { ...this.newRow };
      this.editIndex = null;
    } else {
      this.rows.push({ ...this.newRow });
    }
    this.resetForm();
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

  // Reiniciar formulario
  resetForm(): void {
    this.newRow = {
      tema: '',
      objetivo: '',
      presupuesto: 0,
      indicador: '',
      responsable: '',
      numero_participantes: 0,
      duracion_horas: 0,
      recursos: '',
      instructor: '',
      dirigido_a: '',
      mes: '',
      acciones_realizadas: 0,
      acciones_planificadas: 0,
      indice_eficacia: 0,
    };
  }

  generarPDF(): void {
    this.srvPlanCapacitaciones
      .generarPlanCapacitacion(this.getData())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          const blob = new Blob([data], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          window.open(url);
        },
        error: (error: any) => {
          console.error(error);
        },
      });
  }

  //funcion para  generar el pdf y se descargue en el navegador
  descargarPDF(): void {
    this.srvPlanCapacitaciones
      .generarPlanCapacitacion(this.getData())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          const blob = new Blob([data], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'Plan de Capacitación.pdf';
          a.click();
        },
        error: (error: any) => {
          console.error(error);
        },
      });
  }

  //funcion para generar el pdf y mostrarlo en el html
  mostrarPDF(): void {
    this.srvPlanCapacitaciones
      .generarPlanCapacitacion(this.getData())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          const blob = new Blob([data], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = url;
          document.body.appendChild(iframe);
        },
        error: (error: any) => {
          console.error(error);
        },
      });
  }

  //mmuestra el pdf sanitizado

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
    this.srvPlanCapacitaciones
      .generarPlanCapacitacion(this.getData())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          const blob = new Blob([data], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
          this.viewPdf = true;
          this.pdfGenerated = true;
          Swal.close();
        },
        error: (error: any) => {
          console.error(error);
        },
      });
  }

  volver(): void {
    this.viewPdf = false; // Cambiar de vuelta a la vista principal
  }
}
