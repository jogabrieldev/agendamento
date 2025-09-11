import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './prodService';


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
  private apiUrl = "http://localhost:3000"
  private URL_PROD = environment.apiUrl

    constructor(private http: HttpClient) {
      
       if(environment.production){
          this.useUrl = `${this.URL_PROD}`
       }else{
         this.useUrl = `${this.apiUrl}`
       }
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



}