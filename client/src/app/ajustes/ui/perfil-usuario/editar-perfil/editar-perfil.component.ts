import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModalComponent } from '../../../../shared/ui/botones/button-modal/button-modal.component';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ButtonModalComponent],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css',
})
export class EditarPerfilComponent {
  @Input() usuario: any;
  @Output() cancelarEdicion = new EventEmitter();
  @Output() guardarCambios = new EventEmitter();
  @Output() guardar = new EventEmitter<any>();

  onGuardar() {
    this.guardar.emit(this.usuario);
  }
}
