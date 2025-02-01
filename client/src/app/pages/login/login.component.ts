import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ButtonSaveComponent } from '../../shared/ui/botones/button-save/button-save.component';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoadingInicialComponent } from '../../shared/ui/loading-inicial/loading-inicial.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthStateService } from '../../core/data-access/services/auth-state.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ButtonSaveComponent,
    LoadingInicialComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = true;
  request = true;
  private readonly destroy$ = new Subject<any>();

  myForm!: FormGroup;

  disabled = false;

  _authService = inject(AuthStateService);

  constructor(private readonly router: Router, public fb: FormBuilder) {
    this.myForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
      this.request = false;
    }, 2990);
  }

  login() {
    this._authService.iniciarSesion(this.myForm.value);
  }

  isDisabled(): void {
    this.disabled = this.myForm.valid;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
