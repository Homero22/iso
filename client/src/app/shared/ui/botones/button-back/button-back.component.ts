import { Component, Input } from '@angular/core';

@Component({
  selector: 'button-back',
  standalone: true,
  imports: [],
  templateUrl: './button-back.component.html',
  styleUrl: './button-back.component.css',
})
export class ButtonBackComponent {
  @Input() title: string = '';
}
