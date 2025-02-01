import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';

import config from '../../../../../config/config';
import { Subject } from 'rxjs';
import { ImplementacionService } from '../../data-access/services/implementacion.service';

@Component({
  selector: 'app-planificacion',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './planificacion.component.html',
  styleUrl: './planificacion.component.css',
})
export class PlanificacionComponent implements OnInit, OnDestroy {
  isClicked: boolean = false;
  baseUrl = config.URL_BASE_PATH;
  private readonly destroy$ = new Subject<any>();

  id!: string;
  codigo!: string;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public readonly srvImplementacion: ImplementacionService
  ) {
    console.log('PlanificacionComponent');
  }

  ngOnInit(): void {
    this.srvImplementacion.selctId$.subscribe((id) => {
      this.id = id;
    });

    this.srvImplementacion.selctCodigo$.subscribe((codigo) => {
      this.codigo = codigo;
    });
  }

  IsoClick() {
    this.isClicked = true;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
