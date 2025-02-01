import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sin-datos',
  templateUrl: './sin-datos.component.html',
  styleUrls: ['./sin-datos.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class SinDatosComponent {
  @Input() loading: boolean = false;
  @Input() mensaje: string = '';
}
