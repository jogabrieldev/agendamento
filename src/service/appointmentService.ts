// src/app/services/appointment.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { environment } from '../environments/environment';

export interface Appointment {
// client: any;

  data: string;       
  horario: string;    
  status?: string;   
  nota?: string;
  preco: number;
  idClient: number;
  idUser: number;
  idServi: number[];
}

export interface horarioDisponivel{
   idDispo: number;
   horario: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private useUrl:string = ""

  constructor(private http: HttpClient) {
      this.useUrl = `${environment.apiUrl}`
  }


 getAvailableTimes(data: string): Observable<horarioDisponivel[]> {
  return this.http.get<horarioDisponivel[]>(`${this.useUrl}/horarios-disponiveis/${data}`);
 }

  getAppointments(){
    return this.http.get<Appointment[]>(`${this.useUrl}/appointments`);
  }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.useUrl}/appointments`, appointment);
  }
}
