import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from './prodService';

@Injectable({
  providedIn: 'root'
})
export class movimentService {
  
  private URL = 'http://localhost:3000/service'
  private URL_PROD = environment.apiUrl + 'service'
  constructor(private http: HttpClient , private router:Router) {}

  registerService(newService: { name:string, price:number, idUser: number | string , duracao:string , descricao:string }): Observable<any> {
  return this.http.post(`${this.URL_PROD}`, newService, {
    withCredentials: true
  });
}

}