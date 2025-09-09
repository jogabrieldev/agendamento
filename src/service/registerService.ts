import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from './prodService';
import { serviceAuthUser } from './serviceAuth';

@Injectable({
  providedIn: 'root'
})
export class movimentService {
  
  private URL = 'http://localhost:3000/service'
  private URL_PROD = environment.apiUrl + '/service'
  
  private url:string = ""
  constructor(private http: HttpClient , private router:Router , private token:serviceAuthUser) {
     if(environment.production){
       this.url = `${this.URL_PROD}`
     }else{
       this.url = `${this.URL}`
     }
  }

  registerService(newService: { name:string, price:number, idUser: number | string , duracao:string , descricao:string }): Observable<any> {

    const token =  this.token.getToken()
    if(!token){
       this.router.navigate(['/login'])
    }
   const headers = {Authorization: `Bearer ${token}`}
  return this.http.post(`${this.url}`, newService, {
   headers
  });
}

}