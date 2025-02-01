import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataDBRoles, DataRoles, RolesModel } from '../model/roles';
import { HttpClient } from '@angular/common/http';
import config from '../../../../../config/config';

const initRoles: DataRoles[] = [
  {
    id_perfil: 0,
    per_id: 0,
    descripcion: '',
    usuario: '',
    rol: '',
    estadoperfil: '',
    fechacreacion: '',
    fechaact: '',
  },
];

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  // private URL_API: string = config.URL_API_BASE + '/roles';
  // private URL_API_ME_ROL: string = this.URL_API + '/me';
  // private URL_API_CHANGE_ROL: string = this.URL_API + '/changerol';
  // private URL_API_PERFILES: string = config.URL_API_BASE + '/perfiles';
  // roles!: DataRoles[];
  // rolesDb!: DataDBRoles[];
  // rol: string = '';
  // constructor(private http: HttpClient) {}
  // // Obtener Roles
  // private allRoles$ = new BehaviorSubject<DataRoles[]>(initRoles);
  // //Metodos de roles
  // get selectAllRoles$(): Observable<DataRoles[]> {
  //   return this.allRoles$.asObservable();
  // }
  // setAllRoles(data: DataRoles[]) {
  //   this.allRoles$.next(data);
  // }
  // //CRUD
  // postRol(usuario: number, rol: number) {
  //   return this.http.post<RolesModel>(
  //     `${this.URL_API_PERFILES}`,
  //     {
  //       usuario,
  //       rol,
  //     },
  //     {
  //       withCredentials: true,
  //     }
  //   );
  // }
  // getMeRoles() {
  //   return this.http.get<any>(this.URL_API_ME_ROL, {
  //     withCredentials: true,
  //   });
  // }
  // getRoles(id: number) {
  //   return this.http.get<RolesModel>(`${this.URL_API}/${id}`, {
  //     withCredentials: true,
  //   });
  // }
  // getAllRoles() {
  //   return this.http.get<any>(this.URL_API, {
  //     withCredentials: true,
  //   });
  // }
  // postChangeRoles(id_prefil: any) {
  //   return this.http.post<any>(
  //     this.URL_API_CHANGE_ROL,
  //     { idPerfil: id_prefil },
  //     {
  //       withCredentials: true,
  //     }
  //   );
  // }
  // cambiarEstado(_id: number, estado: string) {
  //   return this.http.put<RolesModel>(
  //     `${this.URL_API_PERFILES}/${_id}`,
  //     {
  //       estado,
  //     },
  //     {
  //       withCredentials: true,
  //     }
  //   );
  // }
}
