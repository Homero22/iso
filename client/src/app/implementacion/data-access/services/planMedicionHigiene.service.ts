import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../../../../config/config';
import { PlanMedicionesHigiene } from '../model/planMedicionHigiene';

@Injectable({
  providedIn: 'root'
})
export class PlanMedicionHigieneService {
  private readonly URL_API_PLAN_MEDICION_HIGIENE: string = config.URL_API_ISO45001 + '/cap6/pdf/plan-medicion-higiene';

  constructor(private readonly http: HttpClient) {
  }

  generarPlanMedicionHigiene(data: PlanMedicionesHigiene) {
    return this.http.post<any>(this.URL_API_PLAN_MEDICION_HIGIENE, data, {
      responseType: 'blob' as 'json',
    });
  }

  

}
