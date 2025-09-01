import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../service/serviceStyle';
import { Client } from '../../../service/clientService';
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

  constructor(private route:ActivatedRoute, private router:Router, private toasty:ToastService, private clientService:Client){}
   
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

      let phone = this.cliente.phone.replace(/\D/g, ""); // remove caracteres não numéricos

      // Verifica se começou com 9 e tem 8 dígitos (celular típico)
    if (phone.length === 9 && phone.startsWith("9")) {
     phone = "62" + phone; // adiciona DDD 62
      } else if (phone.length === 10 && phone.startsWith("9")) {
       // caso cliente já digite 62 + 9, remove 9 extra se precisar
      phone = phone; 
  } else {
    this.toasty.error("Número de telefone inválido!");
    return;
  }

  this.cliente.phone = phone;

     console.log("cliente" , this.cliente)

      this.clientService.registerClient(this.cliente).subscribe({
    next: (res) => {
      console.log(res)

      this.toasty.success("Cliente cadastrado com sucesso!");
      this.router.navigate([`agendamento/${this.token}`]);  // direcionar para o agendamento
    },
    error: (err) => {
      console.error(err);
      this.toasty.error("Erro ao cadastrar cliente!");
     }
   });
  }
  
}
