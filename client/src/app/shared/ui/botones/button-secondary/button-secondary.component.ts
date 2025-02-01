import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import classIcon from '../../../../../../config/material-icons';

@Component({
  selector: 'button-secondary',
  standalone: true,
  imports: [],
  templateUrl: './button-secondary.component.html',
  styleUrl: './button-secondary.component.css',
})
export class ButtonSecondaryComponent {
  //obteniendo contenido y confirmaciond eicono del boton
  @Input() contenido: string = 'none';
  @Input() conIcono: boolean = true;
  @Input() icono: string = 'none';
  @Input() color: string = 'var(--color-black)';
  @Input() titleButton: string = '...';
  @Input() tipoButton: string = '';
  @Input() cuadrado: boolean = false;
  @Input() darkMode: boolean = false;
  @Input() data: any = null;

  // capturando elementos  del padre
  @ViewChild('btnc') btnc!: ElementRef;
  @ViewChild('icono') icon!: ElementRef;

  classIcon: string = classIcon.classIcon;

  constructor() {}

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
}
