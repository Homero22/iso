import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../../../../config/config';

@Injectable(
    { providedIn: 'root' }
)
export class InspeccionCondicionesSeguridadService {
  private  readonly URL_API_INSPECCIONES_CONDICIONES_SEGURIDAD: string = config.URL_API_ISO45001 + '/cap6/pdf/inspecciones-condiciones-seguridad';

  constructor(private readonly http: HttpClient) {
  }

  generarInspeccionCondicionesSeguridad(data: any) {
    return this.http.post<any>(this.URL_API_INSPECCIONES_CONDICIONES_SEGURIDAD, data, {
      responseType: 'blob' as 'json',
    });
  }

}