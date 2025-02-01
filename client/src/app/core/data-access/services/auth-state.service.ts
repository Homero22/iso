import { inject, Injectable } from '@angular/core';
import config from '../../../../../config/config';
import { HttpClient } from '@angular/common/http';
import { AuthModel, DataAuth } from '../model/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, delay, pipe, Subject, takeUntil, tap } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  //int_cliente_id logueado
  public int_cliente_id: number = 1;
  public int_sistema_id: number = 1;

  private readonly destroy$ = new Subject<any>();

  private readonly URL_API_INICIAR_SESION =
    config.URL_API_BASE + '/login/iniciar-sesion';

  private readonly _currentUser = new BehaviorSubject<string | null>(
    this.decodeToken()
  );

  currentUser$ = this._currentUser.asObservable();

  router = inject(Router);

  constructor(private readonly http: HttpClient) {}

  postIniciarSesion(data: DataAuth) {
    return this.http.post<AuthModel>(this.URL_API_INICIAR_SESION, data);
  }

  logout() {
    this.removeToken();
    this.router.navigateByUrl('/');
  }

  private saveToken(token: string) {
    localStorage.setItem('userData', JSON.stringify(token));
  }

  private removeToken() {
    localStorage.removeItem('userData');
  }

  private decodeToken() {
    const userData = localStorage.getItem('userData');

    return userData ? JSON.parse(userData) : null;
  }

  iniciarSesion(data: DataAuth) {
    Swal.fire({
      title: 'Comprobando Credenciales ...',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    this.postIniciarSesion(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res.status) {
            if (res.status) {
              Swal.close();
              this.saveToken(res.body);
              this._currentUser.next(res.body);
              this.router.navigateByUrl('/dashboard');
            } else {
              Swal.close();
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: res.message,
              });
              this.removeToken();
            }
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: res.message,
            });
          }
        },
      });
  }
}
