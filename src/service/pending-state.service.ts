// src/app/services/pending-state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PendingStateService {
  
  private _appointments$ = new BehaviorSubject<any[] | null>(null);

  get appointments$(): Observable<any[] | null> {
    return this._appointments$.asObservable();
  }

  // setar appointments
  setAppointments(apps: any[] | null) {
    this._appointments$.next(apps);
  }

  // obter snapshot síncrono (opcional)
  getSnapshot(): any[] | null {
    return this._appointments$.getValue();
  }

  clear() {
    this._appointments$.next(null);
  }
}
