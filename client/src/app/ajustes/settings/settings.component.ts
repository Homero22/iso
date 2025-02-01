import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CardMenuComponent } from '../ui/card-menu/card-menu.component';
import classIcon from '../../../../config/material-icons';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { PerfilUsuarioService } from '../data-access/services/perfil-usuario.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CardMenuComponent, RouterOutlet, CommonModule, RouterLink],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  @Output() guardar = new EventEmitter<any>();

  title: string = 'Ajustes';
  icon: string = 'settings';
  description: string = 'Configura tu cuenta y preferencias';
  classIcon: string = classIcon.classIcon;

  menus = [
    {
      title: 'Roles',
      icon: 'assignment_ind',
      description: 'Creacion de roles y permisos',
      route: 'roles',
    },
    {
      title: 'Perfil de Usuario',
      icon: 'manage_accounts',
      description: 'Administra tu información personal',
      route: 'perfil-usuario',
    },
    {
      title: 'Empresa',
      icon: 'business',
      description: 'Administra la información de la empresa',
      route: 'empresa',
    },
  ];

  isCardClicked = false;
  isClicked = false;
  activeTab: string = '';
  activeTabTitle: string = '';
  activeSubTab: string = '';
  activeSubTabTitle: string = '';

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly srvPerfilUsuario: PerfilUsuarioService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      const urlSegments = this.router.url.split('/');
      this.activeTab = urlSegments[2];
      this.activeSubTab = urlSegments[3];
      const menu = this.menus.find((item) => item.route === this.activeTab);
      this.activeTabTitle = menu ? menu.title : '';
      // Aquí puedes agregar lógica para obtener el título del sub-tab si es necesario
      this.activeSubTabTitle = this.activeSubTab ? this.activeSubTab : '';
      this.activeSubTabTitle = this.activeSubTabTitle.replace(/-/g, ' ');
      this.activeSubTabTitle =
        this.activeSubTabTitle.charAt(0).toUpperCase() +
        this.activeSubTabTitle.slice(1);
    });
  }
  onNavigate(route: string) {
    this.isCardClicked = true;
    this.activeTab = route;
    console.log('route', route);
    if (route === 'empresa') {
      this.srvPerfilUsuario.setIsClicked(false);
    }
    const menu = this.menus.find((item) => item.route === route);
    this.activeTabTitle = menu ? menu.title : '';
    this.router.navigate([route], { relativeTo: this.route });
  }

  returnNavigate() {
    this.isCardClicked = false;
    this.activeTab = '';
    this.activeTabTitle = '';
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
}
