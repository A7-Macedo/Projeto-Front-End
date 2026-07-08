import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient)
  private readonly rounter = inject(Router)
  private readonly apiUrl = 'https://api-senai-angular.vercel.app/api'

  cadastro(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, {name, email, password})
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, {email, password}).pipe(
      tap(( response: any) => {
        localStorage.setItem('token', response.token)
      })
      
      )
  }

    esqueceuSenha(email: string): Observable<any> {
      return this.http.post(`${this.apiUrl}/auth/forgot-password`, { email })
    }

    logout(): void {
      localStorage.removeItem('token');
      this.rounter.navigate(['/login'])
    }

    isLoggedIn(): boolean {
      return !!localStorage.getItem('token')
    }

    getToken(): string | null {
      return localStorage.getItem('token');
    }

}