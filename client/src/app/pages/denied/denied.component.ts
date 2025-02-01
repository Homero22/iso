import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-denied',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './denied.component.html',
  styleUrl: './denied.component.css',
})
export class DeniedComponent {}
