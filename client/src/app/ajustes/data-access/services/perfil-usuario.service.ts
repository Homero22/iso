import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../../../../../config/config';
import {
  NuevaClave,
  NuevaClaveModel,
  PerfilUsuario,
  PerfilUsuarioModel,
} from '../model/perfil-usuario';
import { BehaviorSubject, Observable, pipe, Subject, takeUntil } from 'rxjs';

const initPerfilUsuario: PerfilUsuario = {
  int_usuario_id: 0,
  str_usuario_nombres: '',
  str_usuario_apellidos: '',
  str_usuario_email: '',
  str_usuario_cedula: '',
  str_usuario_telefono: '',
  str_usuario_estado: '',
  str_usuario_tipo: '',
  str_usuario_clave: '',
  dt_usuario_fecha_registro: new Date(),
  dt_fecha_creacion: new Date(),
  dt_fecha_actualizacion: new Date(),
};

const isClicked: boolean = false;

@Injectable({
  providedIn: 'root',
})
export class PerfilUsuarioService {
  private readonly destroy$ = new Subject<any>();

  private readonly URL_API = config.URL_API_BASE + '/usuarios';
  private readonly URL_API_CLAVE =
    config.URL_API_BASE + '/usuarios/cambiar-clave';
  private readonly URL_API_SESONES = config.URL_API_BASE + '/sesiones';

  perfilUsuario!: PerfilUsuario[];

  private readonly dataPerfilUsuario$ = new Subject<PerfilUsuario[]>();
  private readonly updatePerfilUsuario$ = new BehaviorSubject<PerfilUsuario>(
    initPerfilUsuario
  );

  private readonly isClicked$ = new BehaviorSubject<boolean>(isClicked);

  setPerfilUsuario(data: PerfilUsuario[]) {
    this.dataPerfilUsuario$.next(data);
  }

  get SelectPerfilUsuario$(): Observable<PerfilUsuario[]> {
    return this.dataPerfilUsuario$.asObservable();
  }

  setUpdatePerfilUsuario(data: PerfilUsuario) {
    this.updatePerfilUsuario$.next(data);
  }

  get SelectUpdatePerfilUsuario$(): Observable<PerfilUsuario> {
    return this.updatePerfilUsuario$.asObservable();
  }

  setIsClicked(data: boolean) {
    this.isClicked$.next(data);
  }

  get SelectIsClicked$(): Observable<boolean> {
    return this.isClicked$.asObservable();
  }

  constructor(private readonly http: HttpClient) {}

  getPerfilUsuarioByID(id: number) {
    return this.http.get<PerfilUsuarioModel>(`${this.URL_API}/${id}`);
  }

  patchPerfilUsuarioByID(id: number, body: PerfilUsuario) {
    return this.http.patch<PerfilUsuarioModel>(`${this.URL_API}/${id}`, body);
  }

  postCambiarClave(body: NuevaClave) {
    return this.http.post<NuevaClaveModel>(`${this.URL_API_CLAVE}`, body);
  }

  obtenerPerfilUsuario(id: number) {
    this.getPerfilUsuarioByID(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resp: PerfilUsuarioModel) => {
          if (resp.status) {
            this.perfilUsuario = [resp.body];
            this.setPerfilUsuario(this.perfilUsuario);
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
