import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './prodService';
import {serviceAuthUser} from './serviceAuth'
import { Router } from '@angular/router';
export interface Horario {
  dataIndisponivel: any;
  idDispo: number;
  horario: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ListHoursService {

   private apiUrl: string;
  private baseUrl: string;



  constructor(private http: HttpClient , private token:serviceAuthUser , private route:Router) {
      if (environment.production) {
      this.apiUrl = environment.apiUrl + '/api/disponi';
      this.baseUrl = environment.apiUrl + '/api/indisponible';
    } else {
      this.apiUrl = 'http://localhost:3000/api/disponi';
      this.baseUrl = 'http://localhost:3000/api/indisponible';
    }
  }

  
  getAllHours(): Observable<{ horarios: Horario[] }> {
    const token = this.token.getToken(); 
     if(!token){this.route.navigate(['/login'])}

    const headers = { Authorization: `Bearer ${token}` };

    return this.http.get<{ horarios: Horario[] }>(this.apiUrl, {headers}  );
  }

  deleteHours(id: number): Observable<any> {
    const token = this.token.getToken(); 
     if(!token){this.route.navigate(['/login'])}
     
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.delete(`${this.apiUrl}/${id}`, {headers});
  }

  getIndisponiveis(idUser: string) {
    const token = this.token.getToken()
    if(!token){
       this.route.navigate(['/login'])
    }
    const headers = {Authorization: `Bearer ${token}`}
    return this.http.get<{ horarios: any[], indisponiveis: any[] }>(
      `${this.baseUrl}/${idUser}`,{headers}
    );
  }

  updateHour(id: number, updatedHour: { horario: string, bodyStatus: string }): Observable<any> {

    const token = this.token.getToken(); 
     if(!token){this.route.navigate(['/login'])}
     
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.put(`${this.apiUrl}/${id}`, updatedHour, { headers });
  }

  indisponible(payload: { status: string, horario: string, dataIndisponivel: string, idUser: string | any }) {

    const token = this.token.getToken(); 
     if(!token){this.route.navigate(['/login'])}
     
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post(`${this.baseUrl}`, payload , {headers});
  }

}
