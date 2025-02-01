import { Injectable } from '@angular/core';

import config from '../../../../../config/config';
import { HttpClient } from '@angular/common/http';
import { ObjetivoSST } from '../model/objetivosSST';

@Injectable({
  providedIn: 'root',
})
export class ObjetivosSSTService {
  /*********************************************** URL *********************************************************/
  private readonly URL_API_OBJETIVOS: string =
    config.URL_API_ISO45001 + '/cap6/pdf/objetivos-sst';

  constructor(private readonly http: HttpClient) {}

  getPdf(objetivosSST: ObjetivoSST) {
    return this.http.post(this.URL_API_OBJETIVOS, objetivosSST, {
      responseType: 'blob' as 'json', // Especifica que la respuesta es un blob (archivo binario)
    });
  }
}
