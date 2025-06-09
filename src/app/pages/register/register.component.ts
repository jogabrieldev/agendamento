import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { movimentHours } from '../../../service/registerHours';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    
  horario = ''
  constructor(private hoursUser:movimentHours, // nome corrigido
    private router: Router
    ){}

  registerHours(){
     const idUser = localStorage.getItem("userId"); // Recuperando o ID do usuário armazenado após login
    if (!idUser) {
        alert("Usuário não identificado.");
        return;
    }

     const hours = {
         horario: this.horario,
         status: 'Disponivel',
         idUser:idUser
     }
   console.log('user' , hours.idUser)
      this.hoursUser.registerHours(hours).subscribe({
         next:(res)=>{

           if(res.success ){
              alert('horario cadastrado com suceeso')
            }else{
            alert('Token não recebido');
           }
         }
      })
  }

}
