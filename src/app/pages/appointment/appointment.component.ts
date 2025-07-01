import { Component, OnInit } from '@angular/core';
import { AppointmentService  , Appointment} from '../../../service/appointmentService';
import { clientService } from '../../../service/acessClient';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-appointment',
  imports: [CommonModule , FormsModule],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent implements OnInit {
  [x: string]: any;
     
  token:string = ""
  dataSelecionada: string = '';
  horariosDisponiveis: string[] = [];
  horarioEscolhido: string = '';
  precoServico: number = 50.00;  // ex: valor fixo, você pode adaptar
  client: any = null;          // ex: vem do login
  idUser: number = 1;            // cabeleireiro responsável, ou pode ser fixo
  services: any[] = [];           // serviço escolhido, pode vir de um select
  loadingTimes = false;
  loadingSubmit = false;
  loading = true;
  servicosSelect: any[] = []
  servicoCheckState: { [key: number]: boolean } = {};


  constructor(private appointmentService: AppointmentService , private clientService: clientService , private route: ActivatedRoute) {}
   
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const tokenParam = params.get('token');
      if (tokenParam) {
        this.token = tokenParam;
        this.loadClientAndServices();
      }
    });
  }

  loadClientAndServices() {
    this.clientService.getClientByToken(this.token).subscribe({
      next: (response) => {
         console.log("Dados do cliente recebidos:", response.client)
        this.client = response.client.idClient;
        this.services = response.servico || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar dados:', error);
        this.loading = false;
      }
    });
  }
  buscarHorarios() {
    if (!this.dataSelecionada) {
      this.horariosDisponiveis = [];
      return;
    }
    this.loadingTimes = true;
    this.appointmentService.getAvailableTimes(this.dataSelecionada)
      .subscribe({
        next: (times) => {
          this.horariosDisponiveis = times;
          this.loadingTimes = false;
        },
        error: () => {
          alert('Erro ao carregar horários disponíveis');
          this.loadingTimes = false;
        }
      });
  }

  agendar() {
    if (!this.horarioEscolhido || !this.dataSelecionada) {
      alert('Selecione data e horário!');
      return;
    }

      if(this.servicosSelect.length === 0) {
    alert('Selecione pelo menos um serviço!');
    return;
  }

    const novoAgendamento: Appointment = {
      data: this.dataSelecionada,
      horario: this.horarioEscolhido,
      preco: this.precoServico,
      idClient: this.client,
      idUser: this.idUser,
      idServi: this.servicosSelect,
      status: 'Agendado'
    };

    console.log('agenda' , novoAgendamento)
    console.log('Serviço selecionado:', this.servicosSelect);


    this.loadingSubmit = true;
    this.appointmentService.createAppointment(novoAgendamento)
      .subscribe({
        next: () => {
          alert('Agendamento realizado com sucesso!');
          this.horarioEscolhido = '';
          this.horariosDisponiveis = [];
          this.loadingSubmit = false;
        },
        error: (err) => {
          alert(err.error?.error || 'Erro ao realizar agendamento');
          this.loadingSubmit = false;
        }
      });
  }
  

  getCheckedValue(event: Event): boolean {
  return (event.target as HTMLInputElement).checked;
}

toggleServicoSelecionado(serviceId: number | undefined, checked: boolean) {
  if (!serviceId) {
    console.error("ID do serviço inválido:", serviceId);
    return;
  }

  if (checked) {
    // Apenas esse ID deve ser enviado
    this.servicosSelect = [Number(serviceId)];

    // Atualiza visualmente os checkboxes
    this.servicoCheckState = {};
    this.servicoCheckState[serviceId] = true;
  } else {
    this.servicosSelect = [];
    this.servicoCheckState[serviceId] = false;
  }
}



onCheckboxChange(event: Event, serviceId: number) {
  console.log('service' ,serviceId)
  const checked = (event.target as HTMLInputElement).checked;
  this.toggleServicoSelecionado(serviceId, checked);
}


isSelecionado(serviceId: number): boolean {
  return this.servicosSelect.includes(serviceId);
}

}
