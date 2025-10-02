import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../service/serviceStyle';
import { Client , ClientResponse } from '../../../service/clientService';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-client-register',
  imports: [CommonModule , FormsModule , NgxMaskDirective],
  providers:[provideNgxMask()],
  templateUrl: './client-register.component.html',
  styleUrl: './client-register.component.css'
})
export class ClientRegisterComponent {

  cliente = {
     name:"",
     email:"",
     phone:"",
     token: ""
  }
  
  token:string |  null = null

  constructor(
    private route:ActivatedRoute,
     private router:Router, 
     private toasty:ToastService, 
     private clientService:Client ,
    ){}
   
  ngOnInit():void{
     this.route.params.subscribe(params => {
        if (params['token']) {
          this.token = params['token'];
  
          this.cliente.token = this.token ?? ""
        }
     });
  }
   registerClient(){
     if(!this.cliente.name || !this.cliente.phone){
        this.toasty.error("Preencha todos os campos")
        return
     }

      
      let phone = this.cliente.phone.replace(/\D/g, ""); 
       if(phone.length != 11) return

     this.cliente.phone = phone;

     this.clientService.registerClient(this.cliente).subscribe({
      next: (res:ClientResponse) => {

      this.toasty.success("Cliente cadastrado com sucesso!");

       const token = res.client.tokenAcess;
      this.router.navigate([`agendamento/${token}`]);  
    },
    error: (err) => {
        console.error(err);

      const errorMessage = err?.error?.message || "Erro ao cadastrar cliente!";
      this.toasty.error(errorMessage);
     }
   });
  }

    goToAuth() {
    this.router.navigate(['client/acesso']);
  }


}
