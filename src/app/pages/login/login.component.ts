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
        if(tokenRecebidoDoBackend){
           this.authService.login(tokenRecebidoDoBackend);
           console.log('Resposta do login:', res);
            console.log('res.user:', res.user);
            console.log('res.user.idUser:', res.user?.idUser);

           localStorage.setItem("userId", res.user?.idUser);
           localStorage.setItem('userName' , res.user?.name)
           console.log('Nome salvo no localStorage:', localStorage.getItem('userName'));
          this.router.navigate(['/home']);

          alert('Login com sucesso');
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

