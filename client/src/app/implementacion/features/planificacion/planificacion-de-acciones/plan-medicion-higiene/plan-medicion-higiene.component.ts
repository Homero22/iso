import { Component, OnInit, } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonBackComponent } from '../../../../../shared/ui/botones/button-back/button-back.component';
import { ButtonSaveComponent } from '../../../../../shared/ui/botones/button-save/button-save.component';
import { ButtonAddComponent } from '../../../../../shared/ui/botones/button-add/button-add.component';
import { ButtonDeleteComponent } from '../../../../../shared/ui/botones/button-delete/button-delete.component';
import { ButtonEditComponent } from '../../../../../shared/ui/botones/button-edit/button-edit.component';
import classIcon from '../../../../../../../config/material-icons';
import { Objetivos, PlanMedicionesHigiene } from '../../../../data-access/model/planMedicionHigiene';
import { PlanMedicionHigieneService } from '../../../../data-access/services/planMedicionHigiene.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-plan-medicion-higiene',
  imports: [
    FormsModule,
    CommonModule,
    ButtonBackComponent,
    ButtonSaveComponent,
    ButtonAddComponent,
    ButtonDeleteComponent,
    ButtonEditComponent,
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './plan-medicion-higiene.component.html',
  styleUrl: './plan-medicion-higiene.component.css'
})
export class PlanMedicionHigieneComponent implements OnInit{
  private readonly destroy$ = new Subject<any>();

  isFisicoOpen = true;
  isQuimicoOpen = false;
  isBiologicoOpen = false;
  classIcon = classIcon.classIcon;
  viewPdf: boolean = false; // Estado para alternar entre vistas
  pdfUrl: any; // URL segura para mostrar el PDF
  data!: PlanMedicionesHigiene;
  registrando: boolean = false;
  pdfGenerated: boolean = false;
  agregarAccion: boolean = false;
  constructor(
    private readonly srvPlanMedicionHigiene: PlanMedicionHigieneService,
    private readonly sanitizer: DomSanitizer,
    private readonly fb: FormBuilder
  ) {

   }

  minDate!: string;
  maxDate!: string;
  selectedMonth: string | null = null; // Mes seleccionado
  fecha: string | null = null; // Variable vinculada al campo de fecha
  errorMessage: string | null = null; // Mensaje de error para validación



  toggleSection(section: string): void {
    if (section === 'fisico') {
      this.isFisicoOpen = !this.isFisicoOpen;
    } else if (section === 'quimico') {
      this.isQuimicoOpen = !this.isQuimicoOpen;
    } else if (section === 'biologico') {
      this.isBiologicoOpen = !this.isBiologicoOpen;
    }
  }



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

  getData(): PlanMedicionesHigiene {
    this.data = {
      factor_riesgo_fisico: {
        actividades: [
          {
            descripcion: 'Actividad 1',
            objetivos: [
              {
                descripcion: 'Objetivo 1',
                ges: 'GES 1',
                area_trabajo: 'Área de trabajo 1',
                numero_trabajadores: 1,
                tarea: 'Tarea 1',
                duracion_frecuencia: 'Duración 1',
                recursos_humanos: 'Recursos humanos 1',
                recursos_tecnicos: 'Recursos técnicos 1',
                cantidad_mediciones: 1,
                costo_dolares: 1,
                recursos_economicos: 1,
                fecha: '2025-01-01',
                indicador: 'Indicador 1',
                acciones_realizadas: 1,
                acciones_planificadas: 1,
                indice_eficacia: 100,
                responsable: 'Responsable 1',
              },
            ],
          },
        ],
      },
      factor_riesgo_quimico: {
        actividades: [
          {
            descripcion: 'Actividad 2',
            objetivos: [
              {
                descripcion: 'Objetivo 2',
                ges: 'GES 2',
                area_trabajo: 'Área de trabajo 2',
                numero_trabajadores: 2,
                tarea: 'Tarea 2',
                duracion_frecuencia: 'Duración 2',
                recursos_humanos: 'Recursos humanos 2',
                recursos_tecnicos: 'Recursos técnicos 2',
                cantidad_mediciones: 2,
                costo_dolares: 2,
                recursos_economicos: 2,
                fecha: '2025-02-02',
                indicador: 'Indicador 2',
                acciones_realizadas: 2,
                acciones_planificadas: 2,
                indice_eficacia: 100,
                responsable: 'Responsable 2',
              },
            ],
          },
        ],
      },
      factor_riesgo_biologico: {
        actividades: [
          {
            descripcion: 'Actividad 3',
            objetivos: [
              {
                descripcion: 'Objetivo 3',
                ges: 'GES 3',
                area_trabajo: 'Área de trabajo 3',
                numero_trabajadores: 3,
                tarea: 'Tarea 3',
                duracion_frecuencia: 'Duración 3',
                recursos_humanos: 'Recursos humanos 3',
                recursos_tecnicos: 'Recursos técnicos 3',
                cantidad_mediciones: 3,
                costo_dolares: 3,
                recursos_economicos: 3,
                fecha: '2025-03-03',
                indicador: 'Indicador 3',
                acciones_realizadas: 3,
                acciones_planificadas: 3,
                indice_eficacia: 100,
                responsable: 'Responsable 3',
              },
            ],
          },
        ],
      },
      codigo: 'Código del plan de trabajo',
      fecha_elaboracion: '2025-01-01',
      fecha_edicion: '2025-01-01',
      responsable_sst: 'Responsable de SST',
      empresa: 'Nombre de la empresa',
      elaborado_por: 'Nombre del elaborador del plan de trabajo',
      revisado_por: 'Nombre del revisor del plan de trabajo',
      aprobado_por: 'Nombre del aprobador del plan de trabajo',
      firma_elaborador: 'https://picsum.photos/seed/picsum/200/300',
      firma_revisor: 'https://picsum.photos/seed/picsum/200/300',
      firma_aprobador: 'https://picsum.photos/seed/picsum/200/300',
      indice_eficacia: 100,
      total_mediciones: 6,
      total_recursos_economicos: 6,
    };

    return this.data;
  }



  newRow = {
    descripcion: '',
    objetivos: [
      {
        descripcion: '',
        ges: '',
        area_trabajo: '',
        numero_trabajadores: 0,
        tarea: '',
        duracion_frecuencia: '',
        recursos_humanos: '',
        recursos_tecnicos: '',
        cantidad_mediciones: 0,
        costo_dolares: 0,
        recursos_economicos: 0,
        fecha: '',
        indicador: '',
        acciones_realizadas: 0,
        acciones_planificadas: 0,
        indice_eficacia: 0,
        responsable: '',
      },
    ],
  };
  // Agregar un objetivo a la actividad temporal
  addObjetivo(): void {
    this.newRow.objetivos.push({
      descripcion: '',
      ges: '',
      area_trabajo: '',
      numero_trabajadores: 0,
      tarea: '',
      duracion_frecuencia: '',
      recursos_humanos: '',
      recursos_tecnicos: '',
      cantidad_mediciones: 0,
      costo_dolares: 0,
      recursos_economicos: 0,
      fecha: '',
      indicador: '',
      acciones_realizadas: 0,
      acciones_planificadas: 0,
      indice_eficacia: 0,
      responsable: '',
    });
  }
  // Eliminar un objetivo de la actividad temporal
  removeObjetivo(index: number): void {
    this.newRow.objetivos.splice(index, 1);
  }

  // Agregar la actividad temporal a `factor_riesgo_fisico`
  addActividad(): void {
    this.data.factor_riesgo_fisico.actividades.push({ ...this.newRow });
    this.resetActividad();
    console.log('Nueva Actividad Agregada:', this.data.factor_riesgo_fisico.actividades);
  }

  // Resetear la actividad temporal
  resetActividad(): void {
    this.newRow = {
      descripcion: '',
      objetivos: [
        {
          descripcion: '',
          ges: '',
          area_trabajo: '',
          numero_trabajadores: 0,
          tarea: '',
          duracion_frecuencia: '',
          recursos_humanos: '',
          recursos_tecnicos: '',
          cantidad_mediciones: 0,
          costo_dolares: 0,
          recursos_economicos: 0,
          fecha: '',
          indicador: '',
          acciones_realizadas: 0,
          acciones_planificadas: 0,
          indice_eficacia: 0,
          responsable: '',
        },
      ],
    };
  }

  calcularIndicadorEficacia(accion: Objetivos): void {
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

  //calcular el índice de eficacia del plan de inspecciones
  calcularIndiceEficacia(): void {
    let totalAccionesRealizadas = 0;
    let totalAccionesPlanificadas = 0;
    this.data.factor_riesgo_fisico.actividades.forEach((row) => {
      row.objetivos.forEach((objetivo) => {
        totalAccionesRealizadas += objetivo.acciones_realizadas;
        totalAccionesPlanificadas += objetivo.acciones_planificadas;
      });
    });

    this.data.factor_riesgo_quimico.actividades.forEach((row) => {
      row.objetivos.forEach((objetivo) => {
        totalAccionesRealizadas += objetivo.acciones_realizadas;
        totalAccionesPlanificadas += objetivo.acciones_planificadas;
      });
    });

    this.data.factor_riesgo_biologico.actividades.forEach((row) => {
      row.objetivos.forEach((objetivo) => {
        totalAccionesRealizadas += objetivo.acciones_realizadas;
        totalAccionesPlanificadas += objetivo.acciones_planificadas;
      });
    });

    this.data.indice_eficacia =
      (totalAccionesRealizadas / totalAccionesPlanificadas) * 100;


  }


  

  resetForm(): void {
    this.data = {
      factor_riesgo_fisico: {
        actividades: [],
      },
      factor_riesgo_quimico: {
        actividades: [],
      },
      factor_riesgo_biologico: {
        actividades: [],
      },
      codigo: '',
      fecha_elaboracion: '',
      fecha_edicion: '',
      responsable_sst: '',
      empresa: '',
      elaborado_por: '',
      revisado_por: '',
      aprobado_por: '',
      firma_elaborador: '',
      firma_revisor: '',
      firma_aprobador: '',
      indice_eficacia: 0,
      total_mediciones: 0,
      total_recursos_economicos: 0,
    };
    console.log('Formulario restablecido');
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
    this.srvPlanMedicionHigiene
      .generarPlanMedicionHigiene(this.getData())
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






}
