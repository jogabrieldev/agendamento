import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from './prodService';
import { serviceAuthUser } from './serviceAuth';

@Injectable({
  providedIn: 'root'
})
export class movimentHours {

   private URL:string = ""
  
  constructor(private http: HttpClient , private router:Router , private token:serviceAuthUser) {
      if (environment.production) {
      this.URL = environment.apiUrl + '/api/disponi'; 
    } else {
      this.URL = 'http://localhost:3000/api/disponi'; 
    }
  }

 
  

  registerHours(newHours: { horario: string, bodyStatus: string, idUser: number | string }): Observable<any> {
     const token = this.token.getToken()
     const headers = { Authorization: `Bearer ${token}`}
  return this.http.post(`${this.URL}`, newHours, {headers});
}



}