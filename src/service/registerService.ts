import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class movimentService {
 
  constructor(private http: HttpClient , private router:Router) {}

  registerService(newService: { name:string, price:number, idUser: number | string , duracao:string , descricao:string }): Observable<any> {
  return this.http.post(`http://localhost:3000/service`, newService, {
    withCredentials: true
  });
}

}