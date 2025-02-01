import { Component, Input } from '@angular/core';

@Component({
  selector: 'button-add',
  standalone: true,
  imports: [],
  templateUrl: './button-add.component.html',
  styleUrl: './button-add.component.css',
})
export class ButtonAddComponent {
  @Input() title: string = 'Agregar';
}
