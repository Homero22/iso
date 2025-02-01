import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cargando-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cargando-perfil.component.html',
  styleUrl: './cargando-perfil.component.css',
})
export class CargandoPerfilComponent {
  @Input() loading: any;
}
