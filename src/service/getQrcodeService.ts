import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './prodService';


@Injectable({
  providedIn: 'root'  
})


export class GetQrcode {
     constructor(private http: HttpClient ){}

     private apiUrl = 'http://localhost:3000/qr';

       getQRCode(): Observable<{ qr: string }> {
    return this.http.get<{ qr: string }>(this.apiUrl);
  }
}