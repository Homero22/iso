import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ObjetivoSST } from '../../../data-access/model/objetivosSST';
import { ObjetivosSSTService } from '../../../data-access/services/objetivos-sst.service';
import { Subject, takeUntil } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-objetivos',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './objetivos.component.html',
  styleUrl: './objetivos.component.css',
})
export class ObjetivosComponent implements OnInit {
  compromisos: any[] = [
    {
      compromiso:
        '¿Incluya un compromiso de proporcionar condiciones de trabajo seguras y saludables para la prevención de lesiones y enfermedades relacionadas con el trabajo y es apropiado para el propósito, tamaño y contexto de la organización y para la naturaleza específica de sus riesgos y oportunidades de SST?',
      expanded: false,
      objetivos: [],
      color: '#e8eef5',
    },
    {
      compromiso: '¿Proporcione un marco para establecer los objetivos de SST?',
      expanded: false,
      objetivos: [],
      color: '#f5e8e8',
    },
    {
      compromiso:
        '¿Incluya un compromiso de cumplir con los requisitos legales y otros requisitos?',
      expanded: false,
      objetivos: [],
      color: '#efeeed',
    },
    {
      compromiso:
        '¿Incluya un compromiso para eliminar los peligros y reducir los riesgos de SST?',
      expanded: false,
      objetivos: [],
      color: '#eee3ef',
    },
    {
      compromiso:
        '¿Incluya el compromiso con la mejora continua del sistema de gestión de la SST?',
      expanded: false,
      objetivos: [],
      color: '#eaeae0',
    },
    {
      compromiso:
        '¿incluya un compromiso para la consulta y la participación de los trabajadores, y cuando existan, de los representantes de los trabajadores? Es la política de SST:, -Disponible como información documentada, -Comunicada dentro de la organización, -Disponible para las partes interesadas, -Relevante y apropiada',
      expanded: false,
      objetivos: [],
      color: 'rgb(238 238 211)',
    },
  ];

  pdfUrl: any;

  indiceCumplimiento: number = 0; // Promedio de indiceEficacia
  totalPresupuesto: number = 0; // Suma de todos los presupuestos

  private readonly destroy$ = new Subject<any>();

  activeTab: string = 'tab0'; // Tab activo por defecto

  objetivos: any;

  constructor(
    private readonly srvObjetivosSST: ObjetivosSSTService,
    private readonly sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {}

  toggleAccordion(item: any): void {
    item.expanded = !item.expanded;
  }

  // Cambiar el tab activo
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  addObjetivo(compromisoIndex: number): void {
    this.objetivos = this.compromisos[compromisoIndex].objetivos.push({
      descripcion: '',
      expanded: true,
      metas: [],
    });
  }

  deleteObjetivo(compromisoIndex: number, objetivoIndex: number): void {
    this.compromisos[compromisoIndex].objetivos.splice(objetivoIndex, 1);
    this.calcularIndiceCumplimiento();
    this.calcularTotales();
  }

  addMeta(compromisoIndex: number, objetivoIndex: number): void {
    const objetivo = this.compromisos[compromisoIndex].objetivos[objetivoIndex];

    objetivo.metas.push({
      descripcion: '',
      indicador: '',
      indiceEficacia: 0,
      requisitosISO: [],
      responsable: '',
      fecha_inicio: '',
      fecha_final: '',
      presupuesto: 0,
      actividades_planificadas: 0,
      actividades_realizadas: 0,
    });

    // Expandir el objetivo automáticamente al agregar una nueva tarea
    objetivo.expanded = true;

    this.calcularIndiceCumplimiento();
    this.calcularTotales();
  }

  deleteMeta(
    compromisoIndex: number,
    objetivoIndex: number,
    metaIndex: number
  ): void {
    this.compromisos[compromisoIndex].objetivos[objetivoIndex].metas.splice(
      metaIndex,
      1
    );
    this.calcularIndiceCumplimiento();
    this.calcularTotales();
  }

  addRequisito(meta: any): void {
    // Inicializa el array si no existe y agrega un nuevo requisito vacío
    if (!meta.requisitosISO) {
      meta.requisitosISO = [];
    }
    meta.requisitosISO.push('');
  }

  deleteRequisito(meta: any, requisitoIndex: number): void {
    // Elimina el requisito específico del array
    meta.requisitosISO.splice(requisitoIndex, 1);
  }

  calculateIndice(meta: any): void {
    if (meta.actividades_planificadas > 0) {
      meta.indiceEficacia = (
        (meta.actividades_realizadas / meta.actividades_planificadas) *
        100
      ).toFixed(2);
    } else {
      meta.indiceEficacia = 0;
    }

    this.calcularIndiceCumplimiento(); // Recalcular el índice de cumplimiento
    this.calcularTotales();
  }

  calcularIndiceCumplimiento(): void {
    const todasLasMetas = this.compromisos
      .flatMap((compromiso) => compromiso.objetivos)
      .flatMap((objetivo) => objetivo.metas);

    const totalIndiceEficacia = todasLasMetas.reduce(
      (sum, meta) => sum + (parseFloat(meta.indiceEficacia) || 0),
      0
    );

    const totalMetas = todasLasMetas.length;

    this.indiceCumplimiento =
      totalMetas > 0 ? totalIndiceEficacia / totalMetas : 0;
  }

  calcularTotalPresupuesto(): void {
    const todasLasMetas = this.compromisos
      .flatMap((compromiso) => compromiso.objetivos)
      .flatMap((objetivo) => objetivo.metas);

    this.totalPresupuesto = todasLasMetas.reduce(
      (sum, meta) => sum + (meta.presupuesto || 0),
      0
    );
  }

  calcularTotales(): void {
    // Obtener todas las metas
    const todasLasMetas = this.compromisos
      .flatMap((compromiso) => compromiso.objetivos)
      .flatMap((objetivo) => objetivo.metas);

    // Calcular índice de cumplimiento
    const totalIndiceEficacia = todasLasMetas.reduce(
      (sum, meta) => sum + (parseFloat(meta.indiceEficacia) || 0),
      0
    );
    const totalMetas = todasLasMetas.length;
    this.indiceCumplimiento =
      totalMetas > 0 ? totalIndiceEficacia / totalMetas : 0;

    // Calcular total de presupuesto
    this.totalPresupuesto = todasLasMetas.reduce(
      (sum, meta) => sum + (meta.presupuesto || 0),
      0
    );
  }

  guardar(): void {
    console.log('this.indiceCumplimiento:', this.indiceCumplimiento);
    interface CompromisoData {
      compromiso: string;
      objetivos: {
        descripcion: string;
        metas: {
          descripcion: string;

          indicador: string;
          indiceEficacia: number;
          requisitosISO: string[];
          responsable: string;
          fecha_inicio: string;
          fecha_final: string;
          presupuesto: number;
          actividades_planificadas: number;
          actividades_realizadas: number;
        }[];
      }[];
    }

    const data: ObjetivoSST = {
      codigo: 'CODIGO123',
      fecha_edicion: new Date().toISOString(),
      fecha_elaboracion: new Date().toISOString(),
      empresa: 'Empresa XYZ',
      elaborado_por: 'Elaborador',
      revisado_por: 'Revisor',
      aprobado_por: 'Aprobador',
      fecha_revision: new Date().toISOString(),
      firma_elaborador: 'https://picsum.photos/seed/picsum/200/300',
      firma_revisor: 'https://picsum.photos/seed/picsum/200/300',
      firma_aprobador: 'https://picsum.photos/seed/picsum/200/300',
      indiceCumplimiento: parseFloat(this.indiceCumplimiento.toFixed(3)),
      totalPresupuesto: this.totalPresupuesto,
      data: {
        compromisos: this.compromisos.map(
          (c: { compromiso: string; objetivos: any[] }) => ({
            compromiso: c.compromiso,
            objetivos: c.objetivos.map(
              (o: { descripcion: string; metas: any[] }) => ({
                descripcion: o.descripcion,
                metas: o.metas,
              })
            ),
          })
        ) as CompromisoData[],
      },
    };

    this.srvObjetivosSST
      .getPdf(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (pdfBlob: any) => {
          const blob = new Blob([pdfBlob], { type: 'application/pdf' });

          const url = window.URL.createObjectURL(blob);
          this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

          // Crear un enlace para descargar el PDF
          // const a = document.createElement('a');
          // a.href = this.pdfUrl;
          // a.download = 'Informe_SST.pdf';
          // a.click();
          // window.URL.revokeObjectURL(this.pdfUrl);
        },
        error: (error) => {
          console.error('Error al generar el PDF:', error);
        },
      });
  }
}
