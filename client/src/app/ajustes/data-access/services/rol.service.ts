import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalService } from '../../../shared/data-access/services/modal.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import config from '../../../../../config/config';
import { initRol, Rol, RolResponse } from '../model/rol';



@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(
    private readonly http: HttpClient,
    private readonly srvModal: ModalService,
  ) { }

  private destroy$ = new Subject<any>();

  private readonly URL_API_ROLES = config.URL_API_BASE + '/roles';

  rol: Rol[] = [];

  private rolesSubject = new Subject<Rol[]>();
  private readonly updateRol$ = new BehaviorSubject<Rol>(initRol);


  get roles$() {
    return this.rolesSubject.asObservable();
  }
  set roles(value: Rol[]) {
    this.rolesSubject.next(value);
  }

  updateRol(value: Rol) {
    this.updateRol$.next(value);
  }

  get selectUpdateRol$() {
    return this.updateRol$.asObservable();
  }

  /***********CONSULTAS A LA API *************************/

  getRoles() {
    return this.http.get<Rol[]>(this.URL_API_ROLES);
  }
  //editar rol
  patchRol(rol: Rol, id: number) {
    return this.http.patch<Rol>(`${this.URL_API_ROLES}/${id}`, rol);
  }

  //activar/desactivar rol
  toggleEstado(id: number, rol:Rol) {
    return this.http.patch<Rol>(`${this.URL_API_ROLES}/cambiar-estado/${id}`, rol);
  }

  //crear rol
  postRol(rol: Rol) {
    return this.http.post<Rol>(this.URL_API_ROLES, rol);
  }


  //funciones generales que ocupan las consultas a la api

  async obtenerRoles() {
    this.getRoles()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data:any) => {
        if(data.status){
          this.roles = data.body;

        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.message,
          });
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.message,  
        });
      }
    });


  }

  async cambiarEstado(id: number, rol: Rol) {
    this.toggleEstado(id, rol)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data:any) => {
        if(data.status){
          this.obtenerRoles();
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.message,
          });
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.message,  
        });
      }
    });
  }

  async editarRol(rol: Rol, id: number) {
    this.patchRol(rol, id)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data:any) => {
        if(data.status){
          this.obtenerRoles();
          this.srvModal.closeModal();
          Swal.fire({
            icon: 'success',
            title: 'Rol actualizado',
            text: data.message,
          });
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.message,
          });
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.message,  
        });
      }
    });
  }

  async crearRol(rol: Rol) {
    this.postRol(rol)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data:any) => {
        if(data.status){
          this.obtenerRoles();
          this.srvModal.closeModal();
          Swal.fire({
            icon: 'success',
            title: 'Rol creado',
            text: data.message,
          });
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.message,
          });
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.message,  
        });
      }
    });
  }






}
