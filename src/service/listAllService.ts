import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './prodService';

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
  private apiUrlProd = environment.apiUrl + '/api/service';

  constructor(private http: HttpClient) {}

  getAllServices(): Observable<{ service: Service[] }> {
    return this.http.get<{ service: Service[] }>(this.apiUrlProd, { withCredentials: true });
  }

  getServicesByBarber(barberId: number): Observable<{ service: Service[] }> {
  return this.http.get<{ service: Service[] }>(`${this.apiUrlProd}?barberId=${barberId}`, { withCredentials: true });
}


  deleteService(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrlProd}/${id}`, { withCredentials: true });
  }

  updateService(id: number, updatedService: { name: string, descricao: string, duracao: number, price: string | number }): Observable<any> {
  return this.http.put(`${this.apiUrlProd}/${id}`, updatedService, { withCredentials: true });
}

}
