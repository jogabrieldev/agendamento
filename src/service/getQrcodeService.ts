import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './prodService';


@Injectable({
  providedIn: 'root'  
})


export class GetQrcode {
  private apiUrlLocal = 'http://localhost:3000/qr';
  private apiUrlProd = environment.apiUrl + '/qr';
  private useUrl = environment.production ? this.apiUrlProd : this.apiUrlLocal;

  constructor(private http: HttpClient) {}

  getQRCode(): Observable<{ qr: string | null }> {
    return this.http.get<{ qr: string | null }>(this.useUrl);
  }
}
