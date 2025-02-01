import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SinDatosComponent } from '../../../shared/ui/sin-datos/sin-datos.component';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import config from '../../../../../config/config';
import { Subject } from 'rxjs';
import { Empresa } from '../../../ajustes/data-access/model/empresa';
import classIcon from '../../../../../config/material-icons';
import { ImplementacionService } from '../../data-access/services/implementacion.service';
import { BreadcrumbService } from '../../../shared/data-access/services/breadcrumb.service';

@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [CommonModule, SinDatosComponent, RouterLink, RouterOutlet],
  templateUrl: './resumen.component.html',
  styleUrl: './resumen.component.css',
})
export class ResumenComponent implements OnInit, OnDestroy {
  loading: boolean = true;
  request: boolean = true;
  existeEmpresa: boolean = true;
  baseUrl = config.URL_BASE_PATH;
  private readonly destroy$ = new Subject<any>();

  isClicked: boolean = false;
  subscription: any;

  classIcon = classIcon.classIcon;

  empresa: Empresa = {
    int_empresa_id: 3,
    str_empresa_nombre: 'Macacos Dev',
    str_empresa_direccion: 'Riobamba',
    str_empresa_telefono: '0999778684',
    str_empresa_email: 'macacos@gmail.com',
    dt_fecha_creacion: '2025-01-15T17:00:35.697Z',
  };

  datos = [
    { id: 1, codigo: 'ISO45001-001', estado: 'En Proceso', avance: '50%' },
    { id: 2, codigo: 'ISO45001-002', estado: 'Completado', avance: '100%' },
    { id: 3, codigo: 'ISO45001-003', estado: 'Pendiente', avance: '0%' },
  ];

  id!: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly srvImplementacion: ImplementacionService,
    private readonly srvBreadcrumb: BreadcrumbService
  ) {
    console.log('ResumenComponent', router.url);
  }

  ngOnInit(): void {
    this.subscription = this.srvBreadcrumb.Selectclick$.subscribe(
      (isoClick) => {
        this.isClicked = isoClick;
      }
    );
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') ?? '';
    });
  }

  navigateToSubModulo(codigo: string): void {
    this.srvImplementacion.setId(this.id);
    this.router.navigate([
      `/implementacion/resumen/${this.id}/requisito/${codigo}`,
    ]);
  }

  IsoClick() {
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
