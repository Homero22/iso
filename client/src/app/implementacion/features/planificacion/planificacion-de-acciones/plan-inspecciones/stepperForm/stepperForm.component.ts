import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-stepper-form',
  templateUrl: './stepperForm.component.html',
  styleUrls: ['./stepperForm.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule]
})
export class StepperFormComponent {
  currentStep = 0;
  currentItemIndex = 0;
  form: FormGroup;

  steps = [
    { 
      title: 'ORDEN Y LIMPIEZA', 
      items: [
        "Los pasillos entre escritorios y puestos de trabajo se mantienen libres de cajas, papeleras, cables, etc.",
        "Los cajones de los archivadores y puertas de los armarios están cerrados.",
        "Los escritorios están ordenados para evitar la caída de objetos."
      ] 
    },
    { 
      title: 'ESCALERAS', 
      items: [
        "Las escaleras no tienen orificios peligrosos.",
        "Toda escalera de cuatro o más escalones tiene barandilla.",
        "Las escaleras tienen pasamanos en el lado derecho en sentido descendente."
      ] 
    },
    { 
      title: 'SEÑALIZACIÓN', 
      items: [
        "¿Todos los riesgos laborales prioritarios están identificados mediante señalización?",
        "¿La señalización colocada es suficiente?",
        "¿La señalización colocada es excesiva y confunde?"
      ] 
    },
    { 
      title: 'SISTEMA CONTRA INCENDIOS', 
      items: [
        "¿Los extintores están instalados en lugares accesibles?",
        "¿El mantenimiento de los extintores se realiza con la frecuencia necesaria?",
        "¿La edificación dispone de un sistema de alarma de incendios?"
      ] 
    }
  ];

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      steps: this.fb.array(this.steps.map(step => 
        this.fb.array(step.items.map(() => this.createItemFormGroup()))
      ))
    });
  }

  createItemFormGroup(): FormGroup {
    return this.fb.group({
      estado: new FormControl(null),
      accionPreventiva: new FormControl(''),
      accionCorrectiva: new FormControl(''),
      oportunidadMejora: new FormControl(''),
      responsable: new FormControl(''),
      fechaCierre: new FormControl(''),
      porcentajeCumplimiento: new FormControl('')
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
    console.log("Formulario enviado:", this.form.value);
    alert("Formulario completado");
  }
}
