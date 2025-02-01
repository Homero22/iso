import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const isoClick: boolean = false; // Persiste el estado del click

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  constructor() {}

  //Behaviors Subjects
  private readonly click$ = new BehaviorSubject<boolean>(isoClick);

  //Motodos para obtener y pasar los datos para cambiar de vista en el componente ajustes
  get Selectclick$() {
    return this.click$.asObservable();
  }

  setClick(isoClick: boolean) {
    this.click$.next(isoClick);
  }
}
