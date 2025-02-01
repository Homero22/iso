import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mostrar-perfil',
  standalone: true,
  imports: [],
  templateUrl: './mostrar-perfil.component.html',
  styleUrl: './mostrar-perfil.component.css',
})
export class MostrarPerfilComponent {
  @Input() usuario: any;
}
