import { Component } from '@angular/core';
import { Router ,ActivatedRoute } from '@angular/router'
import { FormsModule, ReactiveFormsModule , FormGroup , FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Client } from '../../../service/clientService';
import { ToastService } from '../../../service/serviceStyle';

@Component({
  selector: 'app-access-client',
  imports: [CommonModule , ReactiveFormsModule ],
  templateUrl: './access-client.component.html',
  styleUrl: './access-client.component.css'
})
export class AccessClientComponent {
  token!:string;
  authForm!: FormGroup;
  toast!:ToastService;
  
  constructor( private router: Router ,  private fb: FormBuilder ,  private route: ActivatedRoute, private clientService:Client) {}
  
  ngOnInit(): void {
    // Captura o token da rota
    this.token = this.route.snapshot.paramMap.get('token') || '';

    // Cria o formulário reativo
    this.authForm = this.fb.group({
      telefone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]]
    });
  }
   onSubmit(): void {
    if (this.authForm.valid) {
      const telefone = this.authForm.value.telefone;

      console.log('📱 Telefone informado:', telefone);
      console.log('🔑 Token recebido:', this.token);

      this.clientService.getClientByPhone(telefone).subscribe({
        next: (res) => {
          console.log('✅ Cliente validado:', res);

          // Se o cliente existir, redireciona para agendamento
          this.router.navigate([`/agendamento/${this.token}`]);
        },
        error: (err) => {
          console.error('❌ Erro ao validar telefone:', err);
          this.toast.error(err.error?.message || 'Erro ao validar telefone');
        }
      });
    }
  }
  
}
