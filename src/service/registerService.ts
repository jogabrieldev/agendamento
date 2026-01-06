import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { serviceAuthUser } from './serviceAuth';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class movimentService {
   
  private url = environment.apiUrl + '/service';

  constructor(private http: HttpClient , private router:Router , private token:serviceAuthUser) {}

  registerService(newService: { name:string, price:number, idUser: number | string , duracao:string , descricao:string }): Observable<any> {

    const token =  this.token.getToken()
    if(!token){
      this.router.navigate(['/login'])
    }
   const headers = {Authorization: `Bearer ${token}`}
   return this.http.post(`${this.url}`, newService, {headers});
  }

}