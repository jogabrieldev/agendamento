import { Component, OnInit, } from '@angular/core';
import { Router ,ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, take } from 'rxjs';
import { PendingStateService } from '../../../service/pending-state.service';
import { Client } from '../../../service/clientService';
import { CommonModule} from '@angular/common';
import { ToastService } from '../../../service/serviceStyle';
import { AppointmentService, Appointment } from '../../../service/appointmentService';
@Component({
  selector: 'app-pending-client',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './pending-client.component.html',
  styleUrl: './pending-client.component.css'
})
export class PendingClientComponent implements OnInit {

  pendencias: any[] = [];
  private destroy$ = new Subject<void>();

  constructor(private pendingState: PendingStateService,
    private clientService: Client,
    private route: ActivatedRoute,
    private Router: Router,
    private appointmentService:AppointmentService,
    private toast: ToastService) {}

  ngOnInit(): void {
    // 1) tenta ler do service 
    this.pendingState.appointments$
      .pipe(takeUntil(this.destroy$))
      .subscribe((apps) => {
        if (apps && apps.length > 0) {
          this.pendencias = apps;
        } else {
          // 2) se não tiver em memória, tenta buscar pelo id da queryParam 
          this.route.queryParams.pipe(take(1)).subscribe(params => {
            const id = params['id'];
            if (id) {
              this.clientService.getPendingByClient(id).subscribe({
                next: (res) => {
                  this.pendencias = res.appointments || [];
               
                  this.pendingState.setAppointments(this.pendencias);
                },
                error: (err) => {
                  console.error('Erro ao buscar pendências via API:', err);
                }
              });
            } else {
          
              this.pendencias = [];
            }
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getDataFormatada(data: string): string {
  const dias = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
  
  const [ano, mes, dia] = data.split('-').map(Number);

  const d = new Date(ano, mes - 1, dia);

  const diaSemana = dias[d.getDay()];
  return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano} (${diaSemana})`;
}

concluirPendencia(idAgendamento: number) {
  this.appointmentService.finishAppointment(idAgendamento.toString()).subscribe({
    next: () => {
      // Atualiza o status localmente
      const agendamento = this.pendencias.find(a => a.id === idAgendamento);
      if (agendamento) agendamento.status = 'Concluído';
      this.toast.success('Agendamento concluído!');
      this.Router.navigate(["cliente/cadastro"])
      
    },
    error: (err) => {
      console.error(err);
      const mensagem = err.error?.error || 'Erro ao concluir agendamento.';
      this.toast.error(mensagem);
    }
  });
}
 
}
