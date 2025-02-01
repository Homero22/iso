import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-simple-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './simple-layout.component.html',
  styleUrl: './simple-layout.component.css',
})
export class SimpleLayoutComponent {}
