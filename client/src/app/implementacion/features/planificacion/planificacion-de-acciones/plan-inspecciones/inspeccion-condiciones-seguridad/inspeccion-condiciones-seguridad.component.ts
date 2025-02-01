import { CommonModule } from '@angular/common';
import { Component, } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirmaComponent } from "../../../../../../shared/ui/firma/firma.component";
import { ButtonSaveComponent } from "../../../../../../shared/ui/botones/button-save/button-save.component";
import { InspeccionCondicionesSeguridadService } from '../../../../../data-access/services/inspeccionCondicionesSeguridad.service';
import Swal from 'sweetalert2';
import { Subject, takeUntil } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
interface DataEmpresa {
  nombre: string;
  codigo: string;
  fecha_revision: string;
  lugar: string;
  fecha_inspeccion: Date;
  hora_inspeccion: string;
  responsable_inspeccion: string;
  cargo_responsable: string;
  firma_responsable: string;
  responsable_oficina: string;
  cargo_responsable_oficina: string;
  firma_responsable_oficina: string;
}

interface FormData {
  responsable_inspeccion: string;
  cargo_responsable: string;
  firma_responsable: string;
  responsable_oficina: string;
  cargo_responsable_oficina: string;
  firma_responsable_oficina: string;
}

interface Item {
  estado: string;
  texto: string;
  accionPreventiva: string;
  accionCorrectiva: string;
  oportunidadMejora: string;
  responsable: string;
  fechaCierre: string;
  porcentajeCumplimiento: number;
}

@Component({
  selector: 'app-inspeccion-condiciones-seguridad',
  templateUrl: './inspeccion-condiciones-seguridad.component.html',
  styleUrls: ['./inspeccion-condiciones-seguridad.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FirmaComponent, FormsModule, ButtonSaveComponent]
})
export class InspeccionCondicionesSeguridadComponent {
  private readonly destroy$ = new Subject<any>();
  pdfUrl: any; // URL segura para mostrar el PDF
  pdfGenerated: boolean = false;
  viewPdf: boolean = false; // Estado para alternar entre vistas

  currentStep = 0;
  currentItemIndex = 0;
  form!: FormGroup;
  dataEmpresa: any;
  firmaBase64: string | null = null;
  llenarData = true;
  // Variables para eficacia
  eficacia_orden_limpieza = 0;
  eficacia_escaleras = 0;
  eficacia_senalizacion = 0;
  eficacia_sistema_contra_incendios = 0;
  total_eficacia = 0;
  guardar: string = "Guardar";



  steps = [
    {
      title: 'ORDEN Y LIMPIEZA',
      items: [
        "Los pasillos entre escritorios y puestos de trabajo se mantienen libres de cajas, papeleras, cables, etc.	",
        "Los cajones de los archivadores y las puertas de los armarios se encuentran cerrados	",
        "Se encuentran almacenados carpetas, cajas u otros objetos de forma inestable sobre armarios.	",
        "Los escritorios se encuentra ordenado para evitar la caída de objetos a zonas de paso	",
        "Las paredes están limpias y en buen estado	",
        "La limpieza de ventanas y tragaluces se efectúa con la regularidad e intensidad necesaria	",
        "Los suelos están limpios, secos, sin desperdicios ni material innecesario	",
        "Los materiales están apilados en su sitio sin invadir zonas de paso	",
        "Los materiales se apilan o cargan de manera segura, limpia y ordenada	",
        "Los contenedores están colocados próximos y accesibles a los lugares de trabajo	",
        "Están claramente identificados los contenedores de residuos especiales y/o peligrosos	",
        "Se evita el rebose de los contenedores	",
        "La zona de alrededor de los contenedores de residuos está limpia	"
      ]
    },
    {
      title: 'ESCALERAS',
      items: [
        "Las escaleras y plataformas de material perforado no cuentan con intersticios u orificios que permitan la caída de objetos.",
        "Toda escalera de cuatro o más escalones está provista de su correspondiente barandilla y pasamanos sobre cada lado libre.",
        "Las escaleras entre paredes están provistas de al menos un pasamano, preferentemente situado al lado derecho en sentido descendente.",
        "La inclinación de las escaleras de servicio no es mayor de 60 grados y la profundidad de la huella en los escalones no es menor a 150 milímetros.",
        "Las aberturas de ventanas en los descansos de las gradas se resguardarán con barras o enrejados para evitar caídas.",
        "Se prohíbe la utilización de escaleras de caracol, y en caso de ser utilizadas son de al menos 600 milímetros de ancho.",

      ]
    },
    {
      title: 'SEÑALIZACIÓN',
      items: [
        "¿Todos los riesgos laborales prioritarios están identificados mediante señalización?",
        "¿La señalización colocada es suficiente?",
        "¿La señalización colocada es excesiva y confunde?",
        "¿Existe contraste entre el ambiente que le rodea y la señalización colocada?",
        "¿Está definida las zonas de circulación, ubicación de máquinas/equipos, material/productos?",
        "¿Las zonas de circulación tienen por lo menos un mínimo de 800 milímetros de ancho cuando sea entre máquinas?",
        "¿Las zonas de circulación se mantienen libres de obstáculos en todo momento?",
        "¿Es necesario elementos adicionales para la señalización horizontal como: conos, barreras, reductores de velocidad, entre otros?",
        "¿En general, la señalización se encuentra en buenas condiciones?",
      ]
    },
    {
      title: 'SISTEMA CONTRA INCENDIOS',
      items: [
        "¿Los extintores están instalados en las proximidades de los sitios de mayor riesgo o peligro, de preferencia junto a las salidas y en los lugares fácilmente identificables, accesibles y visibles desde cualquier punto del local y en condiciones de uso inmediato?",
        "¿El mantenimiento y recarga de extintores se lo realiza con la frecuencia necesaria cuando las circunstancias lo requieran mediante una hoja de control? (inspecciones mensuales para asegurar que el extintor esté completamente cargado y operable, que esté en el lugar apropiado, que no haya sido operado o alterado y que no evidencie daño físico o condición que impida la operación del extintor).",
        "¿El mantenimiento y recarga de los extintores lo realiza una empresa especializada, autorizada por el Cuerpo de Bomberos de la jurisdicción?",
        "¿Los extintores cuentan con una placa y etiqueta de identificación de la empresa, conteniendo los siguientes datos: fecha de recarga, fecha de mantenimiento, tipo de agente extintor, capacidad, procedencia e instrucciones para el uso (datos en idioma nativo)?",
        "¿La instalación cuenta con rociadores de agua en los sectores considerados de riesgo (previo un análisis técnico de la carga calorífica y la actividad a realizarse en ellos)?",
        "¿La edificación/instalación dispone de sistemas automáticos de detección? (Tablero central, fuente de alimentación eléctrica, detectores de humo, alarmas manuales, difusores de sonidos, sistema de comunicación y señal de alarma sonora y visual).",
        "¿La edificación dispone de un sistema de alarma de incendios? (Requisito a partir de 500 m² de área útil en edificación o altura de evacuación superior a doce metros (12 m) y/o dispongan de subsuelos, debe contar con una central de detección y alarma que permita la activación manual y automática de los sistemas de alarma, ubicado en un lugar vigilado permanentemente).",

      ]
    }
  ];

  constructor(private readonly fb: FormBuilder,
    private readonly srvInspeccionCondicionesSeguridad: InspeccionCondicionesSeguridadService,
    private readonly sanitizer: DomSanitizer
  ) {
    this.form = this.fb.group({
      steps: this.fb.array(this.steps.map(step =>
        this.fb.array(step.items.map((item) => this.createItemFormGroup(item)))
      ))
    });
    this.dataEmpresa = {
      nombre: "Empresa X",
      codigo: "EMPX",
      fecha_revision: "2021-09-01",
      lugar: "Quito",
      fecha_inspeccion: new Date(),
      //calcular hora actual
      hora_inspeccion: new Date().toLocaleTimeString(),
      responsable_inspeccion: "Juan Perez",
      cargo_responsable: "Gerente",
      firma_responsable: "",
      responsable_oficina: "Maria Rodriguez",
      cargo_responsable_oficina: "Coordinadora",
      firma_responsable_oficina: "",
    };


    this.cambiarGuardar();

  }

  //esto es de prueba
  cambiarGuardar() {
    this.guardar = "Guardando..."; // Estado intermedio opcional
    setTimeout(() => {
      this.guardar = "Guardado";
      setTimeout(() => {
        this.guardar = "Guardar"; // Restaurar a "Guardar" después de 2 segundos
      }, 2000);
    }, 3000);
  }




  createItemFormGroup(item: string): FormGroup {
    return this.fb.group({
      estado: new FormControl(''),
      texto: new FormControl(item),
      accionPreventiva: new FormControl(''),
      accionCorrectiva: new FormControl(''),
      oportunidadMejora: new FormControl(''),
      responsable: new FormControl(''),
      fechaCierre: new FormControl(''),
      porcentajeCumplimiento: new FormControl('', [Validators.min(0), Validators.max(100)])
    });
  }

  get currentItemFormGroup(): FormGroup {
    return this.currentStepItems.at(this.currentItemIndex);
  }


  get stepFormArray() {
    return this.form.get('steps') as FormArray;
  }

  get currentStepItems(): FormArray<FormGroup> {
    return this.stepFormArray.at(this.currentStep) as FormArray<FormGroup>;
  }


  nextItem() {
    if (this.currentItemIndex < this.steps[this.currentStep].items.length - 1) {
      this.currentItemIndex++;
    } else {
      this.nextStep();
    }
  }

  prevItem() {
    if (this.currentItemIndex > 0) {
      this.currentItemIndex--;
    } else {
      this.prevStep();
    }
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.currentItemIndex = 0;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.currentItemIndex = 0;
    }
  }

  finish() {

    //organizar datos para enviar al backend
    this.calcularEficacia();
    let data = {
      eficacia_orden_limpieza: this.eficacia_orden_limpieza,
      eficacia_escaleras: this.eficacia_escaleras,
      eficacia_senalizacion: this.eficacia_senalizacion,
      eficacia_sistema_contra_incendios: this.eficacia_sistema_contra_incendios,
      total_eficacia: this.total_eficacia,
      items: this.form.value.steps,

    };
    //agregar los steps al objeto data

  }


  calcularEficacia() {
    let eficaciaTotales = [0, 0, 0, 0]; // Almacena eficacia por categoría
    let totalSi = 0;
    let totalItems = 0;

    this.stepFormArray.controls.forEach((stepArray, stepIndex) => {
      let countSi = 0;
      let countTotal = stepArray.value.length;

      stepArray.value.forEach((item: any) => {
        if (item.estado === "SI") countSi++;
      });

      eficaciaTotales[stepIndex] = countSi > 0 ? (countSi / countTotal) * 100 : 0;
      totalSi += countSi;
      totalItems += countTotal;
    });

    this.eficacia_orden_limpieza = eficaciaTotales[0];
    this.eficacia_escaleras = eficaciaTotales[1];
    this.eficacia_senalizacion = eficaciaTotales[2];
    this.eficacia_sistema_contra_incendios = eficaciaTotales[3];

    this.total_eficacia = totalItems > 0 ? (totalSi / totalItems) * 100 : 0;

    console.log("Eficacia orden y limpieza:", this.eficacia_orden_limpieza);

    console.log("Eficacia total:", this.total_eficacia);
  }


  paso: number = 1;
  mostrarFirma: boolean = false;

  formData = {
    responsable_inspeccion: "",
    cargo_responsable: "",
    firma_responsable: "",
    responsable_oficina: "",
    cargo_responsable_oficina: "",
    firma_responsable_oficina: ""
  };

  abrirFirma() {
    this.mostrarFirma = true;
  }

  guardarFirma(firma: string) {
    if (this.paso === 1) {
      this.formData.firma_responsable = firma;
      this.paso = 2; // Pasar al siguiente paso
    } else if (this.paso === 2) {
      this.formData.firma_responsable_oficina = firma;
      this.paso = 3; // Mostrar el resumen
    }
    this.mostrarFirma = false;
  }


  guardarDatos() {
    Swal.fire({
      title: 'Generando PDF',
      text: 'Espere un momento por favor...',
      icon: 'info',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    //organizo los datos para enviar al backend
    let data = {
      ...this.dataEmpresa as DataEmpresa,
      ...this.formData as FormData,
      items: this.form.value.steps,
      eficacia_orden_limpieza: this.eficacia_orden_limpieza,
      eficacia_escaleras: this.eficacia_escaleras,
      eficacia_senalizacion: this.eficacia_senalizacion,
      eficacia_sistema_contra_incendios: this.eficacia_sistema_contra_incendios,
      total_eficacia: this.total_eficacia
    };
    console.log(" data ", data);
    this.srvInspeccionCondicionesSeguridad.generarInspeccionCondicionesSeguridad(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          // //Opcion 1
          // const file = new Blob([data], { type: 'application/pdf' });
          // this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          //   window.URL.createObjectURL(file)
          // );
          // this.viewPdf = true;
          // this.pdfGenerated = true;
          // //opcion 2
          // const blob = new Blob([data], { type: 'application/pdf' });
          // const url = window.URL.createObjectURL(blob);
          // const a = document.createElement('a');
          // a.href = url;
          // a.download = 'Plan de Capacitación.pdf';
          // a.click();
          // //Opcion 3
          const blob = new Blob([data], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          window.open(url);
          Swal.close();
        },
        error: (error) => {
          console.error(error);
        },
      });
  }




  siguientePaso() {
    if (this.paso < 3) this.paso++;
  }

}
