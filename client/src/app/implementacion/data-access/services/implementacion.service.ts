import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const _id: string = ''; // Persiste el ID
const _codigo: string = ''; // Persiste el código si es necesario
@Injectable({
  providedIn: 'root',
})
export class ImplementacionService {
  constructor() {}

  //Behaviors Subjects

  private readonly tipoId$ = new BehaviorSubject<string>(_id);
  private readonly tipoCodigo$ = new BehaviorSubject<string>(_codigo);

  //Motodos para obtener y pasar los datos para cambiar de vista en el componente ajustes

  get selctId$() {
    return this.tipoId$.asObservable();
  }

  setId(_id: string) {
    this.tipoId$.next(_id);
  }

  get selctCodigo$() {
    return this.tipoCodigo$.asObservable();
  }

  setCodigo(_codigo: string) {
    this.tipoCodigo$.next(_codigo);
  }
}
