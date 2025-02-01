import { Injectable } from '@angular/core';
import config from '../../../../../config/config';
import { CentroEmpresa, CrearCentroEmpresa, DataCentros, initCentroEmpresa } from '../model/centro-empresa';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { ModalService } from '../../../shared/data-access/services/modal.service';

@Injectable({
  providedIn: 'root'
})
export class CentroEmpresaService {
  private readonly URL_API_CENTROS: string = config.URL_API_BASE + '/centros';
  private readonly URL_API_CENTROS_EMPRESA: string = config.URL_API_BASE + '/empresas/centros';

  centro: CentroEmpresa[] = [];

 private readonly destroy$ = new Subject<any>();
 private readonly centrosSubject$ = new BehaviorSubject<CentroEmpresa[]>(
    []
 );
 private readonly empresaIdSubject = new Subject<number>();
 private readonly verEmpresaId$ = new BehaviorSubject<number>(0);


 get dataEmpresaId$() {
    return this.verEmpresaId$.asObservable();
  }

  setDataEmpresaId(value: number) {
    this.verEmpresaId$.next(value);
  }


  constructor(private readonly http: HttpClient, private readonly srvModal: ModalService,) { }

  set centros(value: CentroEmpresa[]) {
    this.centrosSubject$.next(value);
  }
  get centros$() {
    return this.centrosSubject$.asObservable();
  }

  

  crearCentroEmpresa(centroEmpresa: CrearCentroEmpresa) {
    return this.http.post(this.URL_API_CENTROS, centroEmpresa);
  }
  obtenerCentrosEmpresaByEmpresaId(empresaId: number) {
    return this.http.get(`${this.URL_API_CENTROS_EMPRESA}/${empresaId}`);
  }
  editarCentroEmpresa(centroEmpresa: CentroEmpresa) {
    return this.http.patch(this.URL_API_CENTROS + '/' + centroEmpresa.int_centro_id, centroEmpresa);
  }


  async obtenerCentrosEmpresaByEmpresaIdAsync(empresaId: number) {
    this.obtenerCentrosEmpresaByEmpresaId(empresaId)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: ( data : any) => {
        if(data.status){
          this.centros = data.body;
        }else{
          Swal.fire('Error', data.message, 'error');
        }
      },
      error: (error) => {
        Swal.fire('Error', 'Error al obtener centros', 'error');
      }
    });
  }


  async crearCentroEmpresaGeneral(centroEmpresa: CrearCentroEmpresa) {
    this.crearCentroEmpresa(centroEmpresa)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: any) => {
        if(data.status){
          this.obtenerCentrosEmpresaByEmpresaIdAsync(centroEmpresa.int_empresa_id);
          this.srvModal.closeModal();
          Swal.fire('Centro Creado', data.message, 'success');
        }else{
          Swal.fire('Error', data.message, 'error');
        }
      },
      error: (error) => {
        Swal.fire('Error', 'Error al crear centro', 'error');
      }
    });
    
  }

  async editarCentroEmpresaGeneral(centroEmpresa: CentroEmpresa) {
    this.editarCentroEmpresa(centroEmpresa)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: any) => {
        if(data.status){
          this.obtenerCentrosEmpresaByEmpresaIdAsync(centroEmpresa.int_empresa_id);
          this.srvModal.closeModal();
          Swal.fire('Centro Actualizado', data.message, 'success');
        }else{
          Swal.fire('Error', data.message, 'error');
        }
      },
      error: (error) => {
        Swal.fire('Error', 'Error al editar centro', 'error');
      }
    });
  }

}
