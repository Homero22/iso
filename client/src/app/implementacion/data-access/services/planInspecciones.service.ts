import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../../../../config/config';
import { PlanInspecciones,} from '../model/planInspecciones';

@Injectable({
  providedIn: 'root'
})
export class PlanInspeccionesService {
  private URL_API_PLAN_INSPECCION: string = config.URL_API_ISO45001 + '/cap6/pdf/plan-inspecciones';

  constructor(private http: HttpClient) {
  }

  generarPlanInspeccion(data: PlanInspecciones) {
    return this.http.post<any>(this.URL_API_PLAN_INSPECCION, data, {
      responseType: 'blob' as 'json',
    });
  }

  

}
