import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../../../../config/config';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { CrearEmpresa, Empresa, initEmpresa } from '../model/empresa';
import { ModalService } from '../../../shared/data-access/services/modal.service';
import Swal from 'sweetalert2';
import { AuthStateService } from '../../../core/data-access/services/auth-state.service';

@Injectable({
  providedIn: 'root',
})
export class ClienteEmpresaService {
  /*********************************************** URL *********************************************************/
  private readonly URL_API_EMPRESA: string =
    config.URL_API_BASE + '/cliente-empresa/byclienteid';
  private readonly URL_API_EMPRESA_EDITAR: string =
    config.URL_API_BASE + '/empresas';
  private readonly URL_API_EMPRESA_CREAR: string =
    config.URL_API_BASE + '/empresas';

  /*********************************************** Variables *********************************************************/

  empresa: Empresa[] = [];
  id: number;

  constructor(
    private readonly http: HttpClient,
    private readonly srvModal: ModalService,
    private readonly clienteLogueado: AuthStateService
  ) {
    this.id = this.clienteLogueado.int_cliente_id;
    this.obtenerEmpresasByIdCliente(this.id);
  }

  private readonly destroy$ = new Subject<any>();

  //observable para obtener empresas
  private readonly empresasSubject = new Subject<Empresa[]>();
  private readonly updateEmpresa$ = new BehaviorSubject<Empresa>(initEmpresa);

  // TODAS LAS EMPRESAS
  set empresas(value: Empresa[]) {
    this.empresasSubject.next(value);
  }
  get empresas$(): Observable<Empresa[]> {
    return this.empresasSubject.asObservable();
  }
  // UNA SOLA EMPRESA
  updateEmpresa(value: Empresa) {
    this.updateEmpresa$.next(value);
  }
  get selectUpdateEmpresa$() {
    return this.updateEmpresa$.asObservable();
  }

  /***********************************************CONSULTAS A LA API****************************************************/

  // Obtener Empresa del cliente  por id

  getEmpresas(id: number) {
    return this.http.get<any[]>(this.URL_API_EMPRESA + '/' + this.id);
  }

  // Editar Empresa
  putEmpresa(empresa: Empresa, id: number) {
    return this.http.patch<any>(
      this.URL_API_EMPRESA_EDITAR + '/' + id,
      empresa
    );
  }

  // Crear Empresa
  postEmpresa(empresa: CrearEmpresa) {
    return this.http.post<any>(this.URL_API_EMPRESA_CREAR, empresa);
  }

  /***********************************************FUNCIONES****************************************************/
  //servicio general obtener empresa por id

  async obtenerEmpresasByIdCliente(id: number) {
    this.getEmpresas(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          if (data.status) {
            this.empresas = data.body;
          }
        },
        error: (error: any) => {
          console.error(error as any);
        },
      });
  }

  //servicio general editar empresa
  async editarEmpresa(empresa: Empresa, id: number) {
    console.log(empresa);
    this.putEmpresa(empresa, id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          console.log(data);
          if (data.status) {
            this.obtenerEmpresasByIdCliente(this.id);
            this.srvModal.closeModal();
            Swal.fire({
              icon: 'success',
              title: 'Empresa editada con éxito',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        },
        error: (error: any) => {
          console.error(error as any);
        },
      });
  }

  //servicio general crear empresa
  async crearEmpresa(empresa: CrearEmpresa) {
    console.log(empresa);
    this.postEmpresa(empresa)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          console.log(data);
          if (data.status) {
            this.obtenerEmpresasByIdCliente(this.id);
            this.srvModal.closeModal();
            Swal.fire({
              icon: 'success',
              title: 'Empresa creada con éxito',
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'No se puede crear la empresa',
              showConfirmButton: true,
              text: data.message,
            });
          }
        },
        error: (error: any) => {
          console.error(error as any);
        },
      });
  }
}
