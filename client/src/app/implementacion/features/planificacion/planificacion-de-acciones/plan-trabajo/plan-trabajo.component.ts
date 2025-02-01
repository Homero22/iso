import { Component } from '@angular/core';
import classIcon from '../../../../../../../config/material-icons';
import { Accion, PlanTrabajo } from '../../../../data-access/model/planTrabajo';
import { Subject, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PlanTrabajoService } from '../../../../data-access/services/planTrabajo.service';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

import { ButtonAddComponent } from '../../../../../shared/ui/botones/button-add/button-add.component';
import { ButtonBackComponent } from '../../../../../shared/ui/botones/button-back/button-back.component';
import { ButtonDeleteComponent } from '../../../../../shared/ui/botones/button-delete/button-delete.component';
import { ButtonEditComponent } from '../../../../../shared/ui/botones/button-edit/button-edit.component';
import { ButtonSaveComponent } from '../../../../../shared/ui/botones/button-save/button-save.component';

@Component({
  selector: 'app-plan-trabajo',
  templateUrl: './plan-trabajo.component.html',
  styleUrls: ['./plan-trabajo.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ButtonAddComponent,
    ButtonBackComponent,
    ButtonDeleteComponent,
    ButtonEditComponent,
    ButtonSaveComponent,
  ],
})
export class PlanTrabajoComponent {
  private readonly destroy$ = new Subject<any>();
  fil!: File;
  filName: string | null = null;
  classIcon = classIcon.classIcon;
  viewPdf: boolean = false; // Estado para alternar entre vistas
  pdfUrl: any; // URL segura para mostrar el PDF
  data!: PlanTrabajo;
  registrando: boolean = false;
  pdfGenerated: boolean = false;
  agregarAccion: boolean = false;
  minDate!: string;
  maxDate!: string;
  selectedMonth: string | null = null; // Mes seleccionado
  fecha: string | null = null; // Variable vinculada al campo de fecha
  errorMessage: string | null = null; // Mensaje de error para validación

  constructor(
    private readonly srvPlanTrabajoService: PlanTrabajoService,
    private readonly sanitizer: DomSanitizer
  ) {}

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

  getData(): PlanTrabajo {
    this.data = {
      acciones: this.rows,
      codigo: 'SST-2025-001',
      fecha_elaboracion: '2025-01-01',
      fecha_edicion: '2025-01-01',
      responsable_sst: 'Juan Pérez',
      empresa: 'Empresa S.A.',
      elaborado_por: 'Juan Pérez',
      revisado_por: 'María Gómez',
      aprobado_por: 'Carlos Ramírez',
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
      fechas_compromiso: [
        '2025-01-01',
        '2025-02-01',
        '2025-03-01',
        '2025-04-01',
        '2025-05-01',
        '2025-06-01',
        '2025-07-01',
        '2025-08-01',
        '2025-09-01',
        '2025-10-01',
        '2025-11-01',
        '2025-12-01',
      ],
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
      fechas_compromiso: [
        '2025-01-01',
        '2025-02-01',
        '2025-03-01',
        '2025-04-01',
        '2025-05-01',
        '2025-06-01',
        '2025-07-01',
        '2025-08-01',
        '2025-09-01',
        '2025-10-01',
        '2025-11-01',
        '2025-12-01',
      ],
      criterios_exito: 'Criterios de éxito 2',
      metodos: 'Métodos de evaluación 2',
      alcance: 'Alcance 2',
      acciones_realizadas: 2,
      acciones_planificadas: 2,
      indicador_eficacia: 100,
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
    // this.editIndex = null;
  }
  mostrarTabla(): void {
    this.viewPdf = false;
  }

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
    this.srvPlanTrabajoService
      .generarPlanTrabajo(this.getData())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          const file = new Blob([response], { type: 'application/pdf' });
          this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            URL.createObjectURL(file)
          );
          this.viewPdf = true;
          this.pdfGenerated = true;
          Swal.close();
        },
        error: (error) => {
          Swal.fire({
            title: 'Error al generar PDF',
            text: error.error.message,
            icon: 'error',
          });
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

  removeFecha(index: number): void {
    this.newRow.fechas_compromiso.splice(index, 1);
  }

  data2: any[] = []; // Almacena los datos leídos del Excel
  headers: string[] = []; // Almacena los encabezados de las columnas

  // Método para manejar el evento de cambio de archivo
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Leer el archivo como ArrayBuffer
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const arrayBuffer = e.target.result;
        const binaryData = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(binaryData, { type: 'array' });

        // Seleccionar la primera hoja
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convertir los datos de la hoja en JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: '' });
        this.data2 = jsonData;

        // Extraer encabezados
        this.headers = Object.keys(jsonData[0] as object);
      };
      reader.readAsArrayBuffer(file);
      this.fil = file;
    }
  }

  exportExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.rows);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Plan de Trabajo');
    XLSX.writeFile(wb, 'plan-trabajo.xlsx');
  }









}
