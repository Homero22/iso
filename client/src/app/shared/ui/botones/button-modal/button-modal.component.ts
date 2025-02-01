import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ModalService } from '../../../data-access/services/modal.service';

import classIcon from '../../../../../../config/material-icons';

@Component({
  selector: 'button-modal',
  standalone: true,
  imports: [],
  templateUrl: './button-modal.component.html',
  styleUrl: './button-modal.component.css',
})
export class ButtonModalComponent implements AfterViewInit {
  //obteniendo contenido y confirmaciond eicono del boton
  @Input() contenido: string = 'none';
  @Input() conIcono: boolean = true;
  @Input() icono: string = 'none';
  @Input() color: string = 'var(--color-black)';
  @Input() titleModal: string = '...';
  @Input() tipoModal: string = '';
  @Input() cuadrado: boolean = false;
  @Input() darkMode: boolean = false;
  @Input() data: any = null;
  // @Output() buttonClick = new EventEmitter<void>(); 

  // capturando elementos  del padre
  @ViewChild('btnc') btnc!: ElementRef;
  @ViewChild('icono') icon!: ElementRef;

  classIcon: string = classIcon.classIcon;

  // elementos del element form
  elementForm: {
    formulario: string;
    title: string;
    data: any;
  } = { formulario: '', title: '', data: {} };

  constructor(private readonly srvModal: ModalService) {}

  seleccionarInput(_tipoForm: string) {
    this.elementForm.formulario = _tipoForm;
    this.elementForm.title = this.titleModal;
    this.elementForm.data = this.data;
    this.srvModal.setFormModal(this.elementForm);
    this.srvModal.openModal();
  }

  ngAfterViewInit(): void {
    this.btnc.nativeElement.style.backgroundColor = this.color;

    if (!this.conIcono) {
      this.icon.nativeElement.style.display = 'none';
    } else {
      this.icon.nativeElement.style.display = 'block';
      this.icon.nativeElement.innerHTML = this.icono;
    }

    if (this.icono === 'edit' || this.icono === 'delete') {
      this.icon.nativeElement.style.fontSize = '15px';
    }

    if (this.cuadrado === true) {
      this.btnc.nativeElement.classList.add('cuadrado');
    }

    if (this.darkMode) {
      this.btnc.nativeElement.classList.add('dark-mode');
    }
  }

  // onButtonClick(): void {
  //   this.buttonClick.emit(); // Emite el evento cuando el botón es clickeado
  // }
}
