import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'  
})


export class GetQrcode {

  private useUrl = `${environment.apiUrl + '/qr'}`;

  constructor(private http: HttpClient) {}

  getQRCode(): Observable<{ qr: string | null }> {
    return this.http.get<{ qr: string | null }>(this.useUrl);
  }
}
