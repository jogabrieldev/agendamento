import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { serviceAuthUser } from '../../../service/serviceAuth';
import { ToastService } from '../../../service/serviceStyle';

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
    private authService: serviceAuthUser, 
    private router: Router ,
    private toast: ToastService
  ) {}

  onSubmit() {
    const user = {
      telefone: this.telefone,
      senha: this.senha
    };

    this.authService.authenticaterUser(user).subscribe({
      next: (res) => {
      
        const tokenRecebidoDoBackend = res.token; 
        if(tokenRecebidoDoBackend){
           this.authService.login(tokenRecebidoDoBackend);
           
           localStorage.setItem("userId", res.user?.idUser);
           localStorage.setItem('userName' , res.user?.name)
           
           this.toast.success("Login com sucesso!")
          this.router.navigate(['/home']);

         
        }else{
            this.toast.error("Erro em fazer login! verifique credencial")
        }
        
      },
      error: (err) => {
        console.error('Erro ao autenticar usuário', err);
        this.toast.error("Erro em fazer login! verifique credencial")
      }
    });
  };
};

