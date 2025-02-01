import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../../../../config/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor( private http: HttpClient) { }

  private URL_API_EMPRESA: string =  config.URL_API_BASE + '/empresas';

  // Obtener Empresa
  getEmpresas(): Observable<any[]> {
    return this.http.get<any[]>(this.URL_API_EMPRESA);
  }

}
