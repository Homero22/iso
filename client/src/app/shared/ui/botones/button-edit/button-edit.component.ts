import { Component, Input } from '@angular/core';

@Component({
  selector: 'button-edit',
  standalone: true,
  imports: [],
  templateUrl: './button-edit.component.html',
  styleUrl: './button-edit.component.css',
})
export class ButtonEditComponent {
  @Input() title: string = 'Editar';
}
