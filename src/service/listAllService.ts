import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { serviceAuthUser } from './serviceAuth';
import { Router } from '@angular/router';

export interface Service {
  idServi: number;
  name: string;
  descricao: string;
  duracao: number;
  price: string | number;
  idUser: number;
}

@Injectable({
  providedIn: 'root'
})
export class ListAllService {

  private apiUrl = 'http://localhost:3000/api/service';
  // private apiUrlProd = environment.apiUrl + '/api/service';

  private URL:string = environment.apiUrl + '/api/service'

  constructor(private http: HttpClient , private token:serviceAuthUser , private router:Router) {
    
  }

 
getAllServices(): Observable<{ service: Service[] }> {
  const token = this.token.getToken();
  if(!token){
     this.router.navigate(['/login']);
      // evita enviar requisição sem token
  }

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<{ service: Service[] }>(this.URL, { headers });
}

getServicesByBarber(barberId: number, token: String): Observable<{ service: Service[] }> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<{ service: Service[] }>(
    `${this.URL}/barber?barberId=${barberId}`,
    { headers }
  );
}



  deleteService(id: number): Observable<any> {
    const token = this.token.getToken()
    if(!token){
       this.router.navigate(['/login'])
    }

    const headers = {Authorization: `Bearer ${token}` }
  return this.http.delete(`${this.URL}/${id}`, { headers });
  }

  updateService(id: number, updatedService: { name: string, descricao: string, duracao: number, price: string | number }): Observable<any> {
    const token = this.token.getToken()
    if(!token){this.router.navigate(['/login'])}
    const headers = {Authorization: `Bearer ${token}`}
    return this.http.put(`${this.URL}/${id}`, updatedService, { headers });
}

}
