import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { movimentHours } from '../../../service/registerHours';
import { movimentService } from '../../../service/registerService';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective , NgxMaskPipe} from 'ngx-mask';

@Component({
  selector: 'app-register',
  imports: [RouterModule, FormsModule, NgxMaskDirective],
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
    private router: Router , private service: movimentService
    ){}

  registerHours(){
     const idUser = localStorage.getItem("userId"); // Recuperando o ID do usuário armazenado após login

     console.log('user' , idUser)
    if (!idUser) {
        alert("Usuário não identificado.");
        return;
    }

    if (!this.hours) {
      alert('Por favor, preencha o horário.');
     return;
    }


     const hours = {
         horario: this.hours,
         status: 'Disponivel',
         idUser:idUser
     }
   console.log('HORARIO' , hours)
     this.hoursUser.registerHours(hours).subscribe({
    next: (res) => {
      alert('Horário cadastrado com sucesso!');
    },
    error: (err) => {
      console.error('Erro ao cadastrar horário:', err);

      if (err.status === 409) {
        // Erro de conflito (horário já existe)
        alert('Este horário já está cadastrado para este usuário!');
      } else if (err.status === 400) {
        alert('Por favor, preencha todos os campos obrigatórios.');
      } else if (err.status === 404) {
        alert('Usuário não encontrado.');
      } else {
        alert('Erro ao cadastrar horário. Tente novamente mais tarde.');
      }
    }
  });
  }


  registerService(){
        
    const idUser = localStorage.getItem("userId"); 

     console.log('user' , idUser)
    if (!idUser) {
        alert("Usuário não identificado.");
        return;
    }

    if(!this.nomeServico){
       alert('Coloque o nome so seu serviçõ')
    }
    
    if(!this.preco){
       alert('Precifique seu trabalho')
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
