import { Injectable } from '@angular/core';
import config from '../../../../../config/config';
import {  CrearUsuarioCentro, initUsuarioCentro, UsuarioCentro, } from '../model/usuario-centro';
import { HttpClient } from '@angular/common/http';
import { ModalService } from '../../../shared/data-access/services/modal.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { Empresa, initEmpresa } from '../model/empresa';
import { CentroEmpresa, initCentroEmpresa } from '../model/centro-empresa';

@Injectable({
  providedIn: 'root'
})
export class UsuariosEmpresaService {

  private readonly URL_API_EMPRESA_USUARIOS: string = config.URL_API_BASE + '/empresas/centro/usuarios';
  private  readonly URL_API_USUARIOS: string = config.URL_API_BASE + '/usuarios';
  private readonly URL_API_USUARIO_CENTRO: string = config.URL_API_BASE + '/usuario-sistema-empresa';


  usuario: UsuarioCentro[] = [];
  empresa: Empresa[] = [];

  constructor(
    private readonly http: HttpClient,
    private readonly srvModal: ModalService,
  ) { }

  private readonly destroy$ = new Subject<any>();

  private  readonly usuariosSubject = new BehaviorSubject<UsuarioCentro[]>([initUsuarioCentro]);
  private readonly updateUsuario$ = new BehaviorSubject<UsuarioCentro>(initUsuarioCentro);
  private readonly verEmpresa$ = new BehaviorSubject<Empresa>(initEmpresa);
  private readonly verCentro$ = new BehaviorSubject<CentroEmpresa>(initCentroEmpresa);

  get dataEmpresa$() {
    return this.verEmpresa$.asObservable();
  }

  setDataEmpresa(value: Empresa) {
    console.log('value empresa', value);
    this.verEmpresa$.next(value);
  }

  get dataCentro$() {
    return this.verCentro$.asObservable();
  }

  setDataCentro(value: CentroEmpresa) {
    console.log('value centro', value);
    this.verCentro$.next(value);
  }



  

  set usuarios(value: UsuarioCentro[]) {
    this.usuariosSubject.next(value);
  }
  get usuarios$() {
    return this.usuariosSubject.asObservable();
  }

  updateUsuario(value: UsuarioCentro) {
    this.updateUsuario$.next(value);
  }
  get selectUpdateUsuario$() {
    return this.updateUsuario$.asObservable();
  }

  /***********CONSULTAS A LA API *************************/

  getUsuariosByIdCentro(id: number) {
    return this.http.get<UsuarioCentro[]>(`${this.URL_API_EMPRESA_USUARIOS}/${id}`);
  }

  //EDITAR USUARIO
  patchUsuario(usuario: UsuarioCentro, id: number) {
    return this.http.patch(`${this.URL_API_USUARIOS}/${id}`, usuario);
  }

  //crear usuario en una centro
  postUsuarioEmpresa(usuario: CrearUsuarioCentro) {
    console.log('usuario ?? ', usuario);
    return this.http.post(this.URL_API_USUARIO_CENTRO, usuario);
  }


  /*********** FUNCIONES *************************/


  async obtenerUsuariosCentro(id: number) {
    this.getUsuariosByIdCentro(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          if (data.status) {
            this.usuarios = data.body;
          }else{
            Swal.fire('Error', data.message, 'error');
            this.usuarios = [];
          }
        },
        error: (error) => {
          Swal.fire('Error', error.error.message, 'error');
        }
      })

  }

  async editarUsuarioEmpresa(usuario: UsuarioCentro, id: number, idEmpresa: number) {
    this.patchUsuario(usuario, id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          if (data.status) {
            this.obtenerUsuariosCentro(idEmpresa);
            this.srvModal.closeModal();
            Swal.fire('Usuario actualizado', data.message, 'success');
          } else {
            Swal.fire('Error', data.message, 'error');
          }
        },
        error: (error) => {
          Swal.fire('Error', error.error.message, 'error');
        }
      });
  }

  async crearUsuarioEmpresa(usuario: CrearUsuarioCentro) {
    this.postUsuarioEmpresa(usuario)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          if (data.status) {
            this.obtenerUsuariosCentro(usuario.int_centro_id);
            this.srvModal.closeModal();
            Swal.fire('Usuario creado', data.message, 'success');
          } else {
            Swal.fire('Error', data.message, 'error');
          }
        },
        error: (error) => {
          Swal.fire('Error', error.error.message, 'error');
        }
      });
  }





}
