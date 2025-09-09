import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './prodService';


@Injectable({
  providedIn: 'root'  
})


export class GetQrcode {

  private useUrlProd:string = ""
   private apiUrl = 'http://localhost:3000/qr';
     constructor(private http: HttpClient ){
       if(environment.production){
          this.useUrlProd = environment.apiUrl + "/qr"
       }else{
        this.useUrlProd = `${this.apiUrl}` 
       }
     }

    

       getQRCode(): Observable<{ qr: string }> {
    return this.http.get<{ qr: string }>(this.useUrlProd);
  }
}