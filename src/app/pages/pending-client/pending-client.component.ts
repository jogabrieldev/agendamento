import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, take } from 'rxjs';
import { PendingStateService } from '../../../service/pending-state.service';
import { Client } from '../../../service/clientService';
import { CommonModule} from '@angular/common';


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
    private route: ActivatedRoute) {}

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
                  // guarda no service pra futuras navegações sem nova chamada
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


}
