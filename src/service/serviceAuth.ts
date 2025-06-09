// auth.service.ts ou user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class serviceAuthUser {
  login(token: string) {
  this.saveToken(token);
}
  constructor(private http: HttpClient , private router:Router) {}

  authenticaterUser(userData: { telefone: string|number;  senha: string|number }): Observable<any> {
    return this.http.post(`http://localhost:3000/authenticate`, userData , {
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
