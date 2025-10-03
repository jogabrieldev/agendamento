import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


export interface ClientResponse {
  success: boolean;
  client: {
    idClient: number;
    name: string;
    telefone: string;
    idUser: number;
    tokenAcess:string
    createdAt:any;
    updatedAt:any;
  };
  servico: Service[];
  token:String
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
      
  private useUrl:string = ""
 
  constructor(private http: HttpClient) { 
       this.useUrl = `${environment.apiUrl}`
    }
   
   
    registerClient(client:{name:string , phone:number | string}){
      return this.http.post<ClientResponse>(`${this.useUrl}/client`, client )
    }
     
    getAcessToken(token: string): Observable<ClientResponse> {
    return this.http.get<ClientResponse>(`${this.useUrl}/client/acesso/${token}`);
    }
    
    getClientByPhone(phone: string): Observable<any> {
  return this.http.get<any>(`${this.useUrl}/client/phone/${phone}`);
}

 getPendingByClient(idClient: number) {
    return this.http.get<any>(`${this.useUrl}/client/pending/${idClient}`);
  }

}