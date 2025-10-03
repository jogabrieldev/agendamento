import { Component } from '@angular/core';
import { Router ,ActivatedRoute } from '@angular/router'
import {  ReactiveFormsModule , FormGroup , FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Client } from '../../../service/clientService';
import { ToastService } from '../../../service/serviceStyle';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import {PendingStateService} from "../../../service/pending-state.service"

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
  
  constructor( private router: Router ,  private fb: FormBuilder ,  private route: ActivatedRoute, private clientService:Client , private toast:ToastService , private pendingState: PendingStateService) {}
  
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
        const token = res.verifique?.tokenAcess;
        const idClient = res.verifique?.idClient; 

        if (!idClient) {
          this.toast.error('ID do cliente não retornado');
          return;
        }

        // verifica se tem pendência
        this.clientService.getPendingByClient(idClient).subscribe({
          next: (pending) => {
            if (pending.hasPending) {
            
              this.pendingState.setAppointments(pending.appointments || []);
              this.router.navigate(['pendencia/client'] , 
              { queryParams: { id: idClient }});
             
            } else {
              if (token) {
                this.toast.success("Validado com sucesso! Faça seu agendamento");
                this.router.navigate([`/agendamento/${token}`]);
              } else {
                this.toast.error('Token não retornado pelo servidor');
              }
            }
          },
          error: (err) => {
            console.error("❌ Erro ao verificar pendências:", err);
            this.toast.error("Erro ao verificar pendências");
          }
        });
      },
      error: (err) => {
        console.error('❌ Erro ao validar telefone:', err);
        this.toast.error(err.error?.message || 'Erro ao validar telefone');
      }
    });
  }
}

  
}
