import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { Layouts } from './layout/data-acces/layout';
import { FullLayoutComponent } from './layout/full-layout/full-layout.component';
import { CommonModule } from '@angular/common';
import { SimpleLayoutComponent } from './layout/simple-layout/simple-layout.component';
import { ModalComponent } from './shared/ui/modal/modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FullLayoutComponent,
    SimpleLayoutComponent,
    ModalComponent,
  ],
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<any>();
  title = 'client';
  Layouts = Layouts;
  layout: Layouts = Layouts.Simple;

  constructor(private readonly router: Router) {}

  ngOnInit() {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        if (data instanceof RoutesRecognized) {
          this.layout = data.state.root.firstChild?.data['layout'];
        }
      },
      error: (err) => {
        console.log('err =>', err);
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
