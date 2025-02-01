import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../../../../config/config';
import { PlanTrabajo } from '../model/planTrabajo';


@Injectable({
  providedIn: 'root'
})
export class PlanTrabajoService {
  private URL_API_PLAN_TRABAJO: string = config.URL_API_ISO45001 + '/cap6/pdf/plan-trabajo';

  constructor(private http: HttpClient) {
  }

  generarPlanTrabajo(data: PlanTrabajo) {
    return this.http.post<any>(this.URL_API_PLAN_TRABAJO, data, {
      responseType: 'blob' as 'json',
    });
  }

  

}
