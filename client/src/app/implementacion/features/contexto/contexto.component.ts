import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contexto',
  standalone: true,
  imports: [],
  templateUrl: './contexto.component.html',
  styleUrl: './contexto.component.css',
})
export class ContextoComponent {
  constructor(private readonly router: Router) {
    console.log('ContextoComponent', router.url);
  }
}
