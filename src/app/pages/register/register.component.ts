import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { movimentHours } from '../../../service/registerHours';
import { movimentService } from '../../../service/registerService';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../service/serviceStyle';

@Component({
  selector: 'app-register',
  imports: [RouterModule, FormsModule],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    
  hours = ''
  nomeServico = ''
  preco = ""
  duracao = ""
  descricao = ""

  constructor(private hoursUser:movimentHours, // nome corrigido
    private router: Router , private service: movimentService,
    private toast:ToastService
    ){}
   
   


  registerHours(){
     const idUser = localStorage.getItem("userId"); // Recuperando o ID do usuário armazenado após login

     console.log('user' , idUser)
    if (!idUser) {
       this.toast.error("Usuário não identificado.");
      
        return;
    }

    if (!this.hours) {
      this.toast.error('Por favor, preencha o horário.');
     return;
    }


     const hours = {
         horario: this.hours,
         status: 'Disponível',
         idUser:idUser
     }
   console.log('HORARIO' , hours)
     this.hoursUser.registerHours(hours).subscribe({
    next: (res) => {
      this.toast.success('Horário cadastrado com sucesso');
    },
    error: (err) => {
      console.error('Erro ao cadastrar horário:', err);

      if (err.status === 409) {
        // Erro de conflito (horário já existe)
        this.toast.error('Este horário já está cadastrado para este usuário!');
      } else if (err.status === 400) {
        this.toast.error('Por favor, preencha todos os campos obrigatórios.');
      } else if (err.status === 404) {
        this.toast.error('Usuário não encontrado.')
      } else {
        this.toast.error('Erro ao cadastrar horário. Tente novamente mais tarde.');
      }
    }
  });
  }


  registerService(){
        
    const idUser = localStorage.getItem("userId"); 

     console.log('user' , idUser)
    if (!idUser) {
       this.toast.error("Usuário não identificado.");
        return;
    }

    if(!this.nomeServico){
       this.toast.error('Por favor, preencha o nome do serviço.');
       return;
    }
    
    if(!this.preco){
      this.toast.error('Por favor, preencha o preço do serviço.');
      return;
    }

     const service = {
      name:this.nomeServico ,
      price:Number(this.preco),
      duracao: this.duracao,
      descricao:this.descricao,
      idUser: idUser
    }

     this.service.registerService(service).subscribe({
         next:(res)=>{
          
              alert('serviço cadastrado com success' )
         },
          
          error: (err) => {
      console.error('Erro ao cadastrar service:', err);

      if (err.status === 409) {
        // Erro de conflito (horário já existe)
        alert('Este serviço já está cadastrado para este usuário!');
      } else if (err.status === 400) {
        alert('Por favor, preencha todos os campos obrigatórios.');
      } else if (err.status === 404) {
        alert('Usuário não encontrado.');
      } else {
        alert('Erro ao cadastrar Serviço. Tente novamente mais tarde.');
      }
    }

   });
  };
};
