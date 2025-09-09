import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './prodService';
export interface Horario {
  dataIndisponivel: any;
  idDispo: number;
  horario: string;
  status: string;
  // outros campos se quiser
}

@Injectable({
  providedIn: 'root'
})
export class ListHoursService {

  private apiUrl = 'http://localhost:3000/api/disponi';
  private Url = "http://localhost:3000";
  
  private apiUrlProd = environment.apiUrl + '/api/disponi';
  private UrlProd = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllHours(): Observable<{ horarios: Horario[] }> {
    return this.http.get<{ horarios: Horario[] }>(this.apiUrlProd, { withCredentials: true });
  }

  deleteHours(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrlProd}/${id}`, { withCredentials: true });
}

getIndisponiveis(idUser: string) {
  return this.http.get<{
    horarios: any[];indisponiveis:any[]
}>(`${this.UrlProd}/api/indisponible/${idUser}`);
}

 updateHour(id: number, updatedHour: { horario: string, bodyStatus: string }): Observable<any> {
  return this.http.put(`${this.apiUrlProd}/${id}`, updatedHour, { withCredentials: true });
}

 indisponible(payload:{status:string , horario:string , dataIndisponivel:string , idUser:string | any}){
   return this.http.post(`${this.UrlProd}/api/indispinible` , payload)
 }

}
