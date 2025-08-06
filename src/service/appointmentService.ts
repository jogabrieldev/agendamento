// src/app/services/appointment.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  private baseUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  getAvailableTimes(data: string) {
  return this.http.get<horarioDisponivel[]>(`${this.baseUrl}/horarios-disponiveis/${data}`);
}
   
  getAppointments(){
    return this.http.get<Appointment[]>(`${this.baseUrl}/appointments`);
  }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.baseUrl}/appointments`, appointment);
  }
}
