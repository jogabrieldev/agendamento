import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Service {
  idServi: number;
  name: string;
  descricao: string;
  duracao: number;
  price: string;
  idUser: number;
}

@Injectable({
  providedIn: 'root'
})
export class ListAllService {
  private apiUrl = 'http://localhost:3000/api/service';

  constructor(private http: HttpClient) {}

  getAllServices(): Observable<{ service: Service[] }> {
    return this.http.get<{ service: Service[] }>(this.apiUrl, { withCredentials: true });
  }
}
