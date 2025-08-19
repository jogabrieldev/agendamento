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
