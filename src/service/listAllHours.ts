import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Horario {
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

  constructor(private http: HttpClient) {}

  getAllHours(): Observable<{ horarios: Horario[] }> {
    return this.http.get<{ horarios: Horario[] }>(this.apiUrl, { withCredentials: true });
  }
}
