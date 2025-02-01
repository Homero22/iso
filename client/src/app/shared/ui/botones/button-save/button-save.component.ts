import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'button-save',
  standalone: true,
  imports: [],
  templateUrl: './button-save.component.html',
  styleUrl: './button-save.component.css',
})
export class ButtonSaveComponent implements OnInit {
  @Input() title: string = 'Guardar';
  @Input() disabled: boolean = false;

  constructor() {}

  ngOnInit(): void {
    console.log('disabled', this.disabled);
  }
}
