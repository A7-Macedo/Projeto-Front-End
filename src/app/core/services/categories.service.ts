import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly http = inject(HttpClient)
  private readonly apiUrl = 'https://api-senai-angular.vercel.app/api/lumiere/categories'


  get(): Observable<any> {
    return this.http.get(this.apiUrl)
  }

  post(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData)
  }

  delete(id: any): Observable<any> {
    return this.http.delete(this.apiUrl + "/" + id)
  }



}
