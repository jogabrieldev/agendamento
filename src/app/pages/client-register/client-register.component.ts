import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../service/serviceStyle';
import { Client , ClientResponse } from '../../../service/clientService';
@Component({
  selector: 'app-client-register',
  imports: [CommonModule , FormsModule],
  templateUrl: './client-register.component.html',
  styleUrl: './client-register.component.css'
})
export class ClientRegisterComponent {

  cliente = {
     name:"",
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
          console.log('token' , this.token)

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
    
    if (phone.length === 9 && phone.startsWith("9")) {
     phone = "62" + phone; // adiciona DDD 62
      } else if (phone.length === 10 && phone.startsWith("9")) {
     
      phone = phone; 
  } else {
    this.toasty.error("Número de telefone inválido!");
    return;
  }

  this.cliente.phone = phone;

     console.log("cliente" , this.cliente)

     this.clientService.registerClient(this.cliente).subscribe({
      next: (res:ClientResponse) => {
      console.log(res)

      this.toasty.success("Cliente cadastrado com sucesso!");

       const token = res.client.tokenAcess;
      this.router.navigate([`agendamento/${token}`]);  
    },
    error: (err) => {
      console.error(err);
      this.toasty.error("Erro ao cadastrar cliente!");
     }
   });
  }
  
}
