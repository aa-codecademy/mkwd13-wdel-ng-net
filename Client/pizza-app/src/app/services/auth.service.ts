import { Injectable, signal } from '@angular/core';
import { PizzaService } from './pizza.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  Login,
  LoginResponse,
  Register,
} from '../types/interfaces/auth.inetrface';
import { catchError, Observable, of, tap } from 'rxjs';
import { apiUrl, snackBarConfig } from '../constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = signal<boolean>(false);

  constructor(
    private pizzaService: PizzaService,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.isLoggedIn.set(!!localStorage.getItem('token'));
  }

  register(registerCredentials: Register): Observable<any> {
    return this.http.post(`${apiUrl}/User/register`, registerCredentials).pipe(
      tap(() => {
        this.snackBar.open(
          'You have successfully registered!',
          'Close',
          snackBarConfig
        );
        this.router.navigate(['/login']);
      }),
      catchError((error) => {
        if (error) {
          this.snackBar.open(
            error?.error?.errors?.[0] || 'Error while registering',
            'Close',
            snackBarConfig
          );
        }
        return of(null);
      })
    );
  }

  // private (TypeScript): compile-time privacy only. The name still exists at runtime and can be accessed/reflected if someone tries.
  // #field (ECMAScript): true runtime privacy. The engine enforces it; you can’t access it from the outside (or even from subclasses).
  #isTokenValid(): boolean {
    const tokenExpirationDate: string | null = localStorage.getItem(
      'tokenExpirationDate'
    );
    if (!tokenExpirationDate) {
      return false;
    }
    return new Date(tokenExpirationDate) > new Date();
  }

  #setToken(token: string, tokenExpirationDate: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpirationDate', tokenExpirationDate);
  }

  login(loginCredentials: Login): Observable<any> {
    return this.http
      .post<LoginResponse>(`${apiUrl}/User/login`, loginCredentials)
      .pipe(
        tap((response: LoginResponse) => {
          this.#setToken(response.result.token, response.result.validTo);
          if (!this.#isTokenValid()) {
            throw new Error('Error while logging in');
          }
          this.isLoggedIn.set(true);
          this.snackBar.open(
            'You have successfully logged in',
            'Close',
            snackBarConfig
          );
          this.router.navigate(['/']);
        }),
        catchError((error) => {
          if (error) {
            this.snackBar.open(
              error?.error?.errors?.[0] || 'Error while logging in',
              'Close',
              snackBarConfig
            );
          }
          return of(null);
        })
      );
  }

  logout() {
    this.isLoggedIn.set(false);
    this.pizzaService.updateActiveOrder([]);
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpirationDate');
    this.router.navigate(['/login']);
  }

  // How to subscribe to an observable
  getUser() {
    return this.http.get(`${apiUrl}/User`).subscribe((result) => {
      console.log(result);
    });
  }
}
