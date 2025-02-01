import { Component, Input } from '@angular/core';

@Component({
  selector: 'button-delete',
  standalone: true,
  imports: [],
  templateUrl: './button-delete.component.html',
  styleUrl: './button-delete.component.css',
})
export class ButtonDeleteComponent {
  @Input() title: string = 'Eliminar';
}
