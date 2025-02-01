import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../data-access/services/breadcrumb.service';
import classIcon from '../../../../../config/material-icons';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css',
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  @Input() icon: string = '';
  breadcrumbs: { label: string; url: string }[] = [];
  routerSubscription!: Subscription;

  classIcon: string = classIcon.classIcon;

  constructor(
    private readonly router: Router,
    private readonly srvBreadcrum: BreadcrumbService
  ) {}

  ngOnInit(): void {
    // Suscribirse a los eventos de navegación
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.generateBreadcrumbs();
      }
    });

    // Generar Breadcrumb inicialmente
    this.generateBreadcrumbs();
  }

  IsoClick() {
    // Cambiar el estado del click
    this.srvBreadcrum.setClick(false);
    console.log('ruta => ', this.breadcrumbs);
  }

  generateBreadcrumbs(): void {
    const urlSegments = this.router.url.split('/').filter(Boolean);
    let accumulatedUrl = '';
    this.breadcrumbs = urlSegments
      .map((segment, index) => {
        accumulatedUrl = this.getUrlForSegment(index, urlSegments);

        // Determinar si este segmento debe ser visible o no
        const isDynamicSegment = this.isDynamicSegment(segment, index);
        const label = isDynamicSegment ? null : this.getLabel(segment);

        return label
          ? {
              label,
              url: accumulatedUrl,
            }
          : null; // Excluir segmentos dinámicos de la visualización
      })
      .filter((breadcrumb) => breadcrumb !== null) as {
      label: string;
      url: string;
    }[]; // Eliminar nulos
  }

  getLabel(segment: string): string {
    const fixedLabels: { [key: string]: string } = {
      implementacion: 'Implementación',
      resumen: 'Resumen',
      requisito: 'Requisito',
    };

    return fixedLabels[segment] || segment; // Etiqueta fija o el segmento como está
  }

  getUrlForSegment(index: number, segments: string[]): string {
    // Construir la URL acumulada preservando parámetros dinámicos
    const segmentList = segments.slice(0, index + 1);

    // Si estamos en "resumen", incluir el `id` inmediatamente después
    if (segmentList.includes('resumen') && !segmentList.includes('requisito')) {
      const resumenIndex = segmentList.indexOf('resumen');
      const id = segments[resumenIndex + 1]; // Obtener el ID asociado a "resumen"
      if (id && !isNaN(+id)) {
        segmentList[resumenIndex + 1] = id; // Asegurarse de que el ID esté incluido
      }
    }

    return `/${segmentList.join('/')}`;
  }

  isDynamicSegment(segment: string, index: number): boolean {
    // Excluir parámetros dinámicos como id y codigo
    const dynamicSegmentsIndexes = [2, 4]; // Indexes donde pueden estar el ID y el código en tu estructura de ruta
    return dynamicSegmentsIndexes.includes(index);
  }

  ngOnDestroy(): void {
    // Limpiar la suscripción al destruir el componente
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
