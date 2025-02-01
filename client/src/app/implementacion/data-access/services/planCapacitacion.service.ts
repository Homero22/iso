import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../../../../config/config';
import { PlanCapacitaciones } from '../model/planCapacitacion';

@Injectable({
  providedIn: 'root'
})
export class PlanCapacitacionService {
  private URL_API_PLAN_CAPACITACION: string = config.URL_API_ISO45001 + '/cap6/pdf/plan-capacitaciones';

  constructor(private http: HttpClient) {
  }

  generarPlanCapacitacion(data: PlanCapacitaciones) {
    return this.http.post<any>(this.URL_API_PLAN_CAPACITACION, data, {
      responseType: 'blob' as 'json',
    });
  }

  

}
