import { Component, EventEmitter, Input, Output } from '@angular/core';
import classIcon from '../../../../../config/material-icons';
import { RouterLink } from '@angular/router';
import config from '../../../../../config/config';

@Component({
  selector: 'app-card-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card-menu.component.html',
  styleUrl: './card-menu.component.css',
})
export class CardMenuComponent {
  @Input() title: string = '';
  @Input() icon: string = '';
  @Input() description: string = '';
  @Input() route: string = '';
  @Output() navigate = new EventEmitter<string>();

  classIcon: string = classIcon.classIcon;

  baseUrl = config.URL_BASE_PATH;

  onCardClick() {
    this.navigate.emit(this.route);
  }
}
