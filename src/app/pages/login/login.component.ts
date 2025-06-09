import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { serviceAuthUser } from '../../../service/serviceAuth';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  telefone = '';
  senha = '';

  constructor(
    private authService: serviceAuthUser, // nome corrigido
    private router: Router // injetando o Router para redirecionamento
  ) {}

  onSubmit() {
    const user = {
      telefone: this.telefone,
      senha: this.senha
    };

    this.authService.authenticaterUser(user).subscribe({
      next: (res) => {
        console.log('Usuário autenticado com sucesso', res);

        const tokenRecebidoDoBackend = res.token; 
        if(tokenRecebidoDoBackend && res.success){
           this.authService.login(tokenRecebidoDoBackend);
           localStorage.setItem("userId", res.idUser);
          this.router.navigate(['/home']);
        }else{
            alert('Token não recebido');
        }
        
      },
      error: (err) => {
        console.error('Erro ao autenticar usuário', err);
        alert('Erro no login, tente novamente.');
      }
    });
  }
}

