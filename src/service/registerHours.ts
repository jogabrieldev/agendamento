import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class movimentHours {
 
  constructor(private http: HttpClient , private router:Router) {}

  registerHours(newHours: { horario:number|string}): Observable<any> {
    return this.http.post(`http://localhost:3000/disponi`, newHours, {
      withCredentials: true
    });
  }


}