import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class clientService {
  loadClientAndServices() {
    throw new Error('Method not implemented.');
  }


    private URL = 'http://localhost:3000'
   

    constructor(private http: HttpClient ) {}

  registerClient(clientData:any){
     return this.http.post(`${this.URL}/client` , clientData)
  }

  getClientByToken(token: string) {
    return this.http.get<any>(`${this.URL}/client/acesso/${token}`);
  }

 updateClientByToken(token: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.URL}/client/updateByToken/${token}`, data);
  }
//  getServicesByBarber(idUser: number) {
//   return this.http.get<any>(`${this.URL}/api/service?barberId=${idUser}`);
// }

}