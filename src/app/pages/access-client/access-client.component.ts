import { Component } from '@angular/core';
import { Router ,ActivatedRoute } from '@angular/router'
import {  ReactiveFormsModule , FormGroup , FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Client } from '../../../service/clientService';
import { ToastService } from '../../../service/serviceStyle';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-access-client',
  standalone:true,
  imports: [CommonModule , ReactiveFormsModule , NgxMaskDirective ],
  providers: [provideNgxMask()],
  templateUrl: './access-client.component.html',
  styleUrl: './access-client.component.css'
})
export class AccessClientComponent {

  token!:string;
  authForm!: FormGroup;
  
  constructor( private router: Router ,  private fb: FormBuilder ,  private route: ActivatedRoute, private clientService:Client , private toast:ToastService) {}
  
  ngOnInit(): void {

    this.token = this.route.snapshot.paramMap.get('token') || '';

    this.authForm = this.fb.group({
      telefone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]]
    });
  }
   onSubmit(): void {
    if (this.authForm.valid) {
      const telefone = this.authForm.value.telefone;


      this.clientService.getClientByPhone(telefone).subscribe({
    next: (res) => {

      // pega o token da resposta
      const token = res.verifique?.tokenAcess;

      if (token) {
        this.toast.success("Validado com sucesso! Faça seu agendamento")
        // redireciona para agendamento com o token
        this.router.navigate([`/agendamento/${token}`]);
      } else {
        this.toast.error('Token não retornado pelo servidor');
      }
    },
    error: (err) => {
      console.error('❌ Erro ao validar telefone:', err);
      this.toast.error(err.error?.message || 'Erro ao validar telefone');
    }
  });
    }
  }
  
}
