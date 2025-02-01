import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-resumen-ejecutivo',
  standalone: true,
  imports: [],
  templateUrl: './resumen-ejecutivo.component.html',
  styleUrl: './resumen-ejecutivo.component.css',
})
export class ResumenEjecutivoComponent {
  @Input() empresaResumen: any;

  ngOnInit() {
    console.log('empresaResumen', this.empresaResumen);
  }
}
