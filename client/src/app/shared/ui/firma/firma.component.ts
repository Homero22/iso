import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-firma',
  templateUrl: './firma.component.html',
  styleUrls: ['./firma.component.css'],
  standalone: true
})
export class FirmaComponent {

  @ViewChild('signatureCanvas') signatureCanvas!: ElementRef<HTMLCanvasElement>;
  @Output() firmaGuardada = new EventEmitter<string>();

  private signaturePad!: SignaturePad;

  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.signatureCanvas.nativeElement, {
      minWidth: 1,
      maxWidth: 3,
      penColor: 'black',
      backgroundColor: 'white'
    });

    this.adjustCanvasSize();
  }

  // Ajustar el tamaño del canvas
  adjustCanvasSize() {
    const canvas = this.signatureCanvas.nativeElement;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d")?.scale(ratio, ratio);
  }

  clearSignature() {
    this.signaturePad.clear();
  }

  saveSignature() {
    if (!this.signaturePad.isEmpty()) {
      const signatureBase64 = this.signaturePad.toDataURL();
      this.firmaGuardada.emit(signatureBase64); // Emitir la firma en Base64 al padre
    } else {
      alert("No hay firma");
    }
  }

}
