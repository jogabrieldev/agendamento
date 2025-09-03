// auth.service.ts ou user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from './prodService';


@Injectable({
  providedIn: 'root'
})
export class serviceAuthUser {
  login(token: string) {
  this.saveToken(token);
}
  constructor(private http: HttpClient , private router:Router) {}
  
  localhost = 'http://localhost:3000/'
   private URL_PROD = environment.apiUrl

  authenticaterUser(userData: { phoneUser: string|number;  senha: string|number }): Observable<any> {
    return this.http.post(`${this.URL_PROD}/authenticate`, userData , {
      withCredentials: true
    });
  }

  saveToken(token:string){
    localStorage.setItem("token" ,token)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn(){
    return !! this.getToken()
  }

  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/user'])
  }
}
