import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { Subject } from 'rxjs';
import classIcon from '../../../../../../config/material-icons';
import config from '../../../../../../config/config';
import { ImplementacionService } from '../../../data-access/services/implementacion.service';

@Component({
  selector: 'app-requisito',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './requisito.component.html',
  styleUrl: './requisito.component.css',
})
export class RequisitoComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  request: boolean = false;
  baseUrl = config.URL_BASE_PATH;
  private readonly destroy$ = new Subject<any>();
  classIcon = classIcon.classIcon;

  isClicked: boolean = false;
  activeTab: string = '';
  menuTabsSelected: number = 0;

  id!: string;
  codigo!: string;

  listaViews: any = {
    CONTEXTO: 0,
    LIDERAZGO: 1,
    PLANIFICACION: 2,
    APOYO: 3,
    OPERACION: 4,
    EVALUACION_DESEMPENO: 5,
    MEJORA: 6,
  };

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public readonly srvImplementacion: ImplementacionService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.codigo = params.get('codigo') ?? '';
    });

    this.srvImplementacion.selctId$.subscribe((id) => {
      this.id = id;
    });

    this.srvImplementacion.setCodigo(this.codigo);

    this.router.events.subscribe(() => {
      this.activeTab = this.router.url.split('/').pop() ?? '';
    });

    const path: string = window.location.pathname.split('/').pop() ?? '';
    this.menuTabsSelected = this.listaViews[path.toUpperCase()] || 0;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
