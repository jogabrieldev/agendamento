import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from './prodService';

@Injectable({
  providedIn: 'root'
})
export class movimentHours {

   private URL = 'http://localhost:3000/api/disponi'
  private URL_PROD = environment.apiUrl + '/api/disponi'
  constructor(private http: HttpClient , private router:Router) {}

  registerHours(newHours: { horario: string, bodyStatus: string, idUser: number | string }): Observable<any> {
  return this.http.post(`${this.URL_PROD}`, newHours, {
    withCredentials: true
  });
}



}