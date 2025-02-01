import { Component, Input, OnInit } from '@angular/core';
import config from '../../../../../config/config';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import classIcon from '../../../../../config/material-icons';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  baseUrl: string = config.URL_BASE_PATH;

  classIcon: string = classIcon.classIcon;

  // list_menu se pasa por el componente desde full-layout.component.ts
  @Input() list_menu: any;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    let sidebar = document.querySelector('.sidebar');
    let sidebarBtn = document.querySelector('#btn-swap-sidebar');
    if (sidebarBtn && sidebar) {
      sidebarBtn.addEventListener('click', () => {
        sidebar?.classList.toggle('close');
      });
    }
  }
  openSubMenu(e: any, path: string) {
    let arrowParentA = e.target.parentElement;
    const lastChildInMenuItem = arrowParentA.lastElementChild.tagName;
    if (lastChildInMenuItem === 'I' || lastChildInMenuItem === 'UL') {
      let arrowParentClick = arrowParentA.parentElement;
      arrowParentClick.classList.toggle('showMenu');
    } else {
      path = this.baseUrl + path;
      this.router.navigate([path]);
    }
  }
}
