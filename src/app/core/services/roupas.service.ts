import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoupasService {
  private readonly http = inject(HttpClient)
  private readonly apiUrl = 'https://api-senai-angular.vercel.app/api/artigos'

  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}`)
  }

  cadastro(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}`, formData)
  }

  getById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`)
  }

  atualiza(formData: FormData, id: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, formData)
  }

  deleta(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }





}
