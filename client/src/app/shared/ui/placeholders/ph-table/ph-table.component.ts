import { Component, Input } from '@angular/core';

@Component({
  selector: 'ph-table',
  standalone: true,
  imports: [],
  templateUrl: './ph-table.component.html',
  styleUrls: ['./ph-table.component.css'],
})
export class PhTableComponent {
  @Input() loading: any;
  constructor() {}
}
