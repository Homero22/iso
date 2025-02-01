import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import config from '../../../../config/config';
import { CommonModule } from '@angular/common';
import { ButtonModalComponent } from '../../shared/ui/botones/button-modal/button-modal.component';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import classIcon from '../../../../config/material-icons';
import { Empresa } from '../../ajustes/data-access/model/empresa';
import { ClienteEmpresaService } from '../../ajustes/data-access/services/cliente-empresa.service';
import { SinDatosComponent } from '../../shared/ui/sin-datos/sin-datos.component';
import { BreadcrumbComponent } from '../../shared/ui/breadcrumb/breadcrumb.component';
import { BreadcrumbService } from '../../shared/data-access/services/breadcrumb.service';

@Component({
  selector: 'app-mostrar-implementacion',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    SinDatosComponent,
    BreadcrumbComponent,
  ],
  templateUrl: './mostrar-implementacion.component.html',
  styleUrl: './mostrar-implementacion.component.css',
})
export class MostrarImplementacionComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  request: boolean = false;
  baseUrl = config.URL_BASE_PATH;
  private readonly destroy$ = new Subject<any>();
  classIcon = classIcon.classIcon;

  isClicked!: boolean;
  empresas: Empresa[] = [];
  empresaResumen!: Empresa;
  subscription: any;

  constructor(
    private readonly clienteEmpresaService: ClienteEmpresaService,
    private readonly router: Router,
    private readonly srvBreadcrumb: BreadcrumbService
  ) {}
  ngOnInit() {
    console.log('url', this.router.url);
    if (this.router.url === '/implementacion') {
      this.isClicked = false;
    }
    // this.subscription = this.srvBreadcrumb.Selectclick$.subscribe(
    //   (isoClick) => {
    //     this.isClicked = isoClick;
    //   }
    // );
    this.clienteEmpresaService.obtenerEmpresasByIdCliente(1);
    this.clienteEmpresaService.empresas$.subscribe((empresas: Empresa[]) => {
      this.empresas = empresas;
      if (this.empresas.length > 0) {
        this.request = false;
        this.loading = false;
      }
    });
  }

  resultadoImplememtacion(empresa: Empresa) {
    this.empresaResumen = empresa;
    this.isClicked = true;
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.destroy$.unsubscribe();
  }
}
