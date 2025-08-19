import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface ClientResponse {
  success: boolean;
  client: {
    idClient: number;
    name: string;
    telefone: string;
    idUser: number;
    token:string
    createdAt:any;
    updatedAt:any;
  };
  servico: Service[];
}

export interface Service {
  idServi: number;
  name: string;
  descricao: string;
  duracao:string
  price: number;
  idUser: number;
  createdAt:any;
  updatedAt:any;
}
@Injectable({
  providedIn: 'root'
})
export class Client {
     
    constructor(private http: HttpClient ) {}

    private apiUrl = "http://localhost:3000"
        
    registerClient(client:{name:string , phone:number | string}){
      return this.http.post(`${this.apiUrl}/client`, client )
    }
     
    getAcessToken(token: string): Observable<ClientResponse> {
    return this.http.get<ClientResponse>(`${this.apiUrl}/client/acesso/${token}`);
    }
    
    getClientByPhone(phone: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/client/phone/${phone}`);
}



}