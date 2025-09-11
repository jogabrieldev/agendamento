import { Component, OnInit } from '@angular/core';
import { AppointmentService  , Appointment , horarioDisponivel} from '../../../service/appointmentService';
import { Client , ClientResponse  } from '../../../service/clientService';
import { ListAllService } from '../../../service/listAllService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../service/serviceStyle';


@Component({
  selector: 'app-appointment',
  imports: [CommonModule , FormsModule],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})

// PROCESSO DE AGENDAMENTO PEGANDO HORARIOS VALIDADOS E AGENDANDO COM SERVIÇOS E HORARIOS DO BARBEIRO
export class AppointmentComponent implements OnInit {
  [x: string]: any;
     
  token:string = ""
  dataSelecionada: string = '';
  horariosDisponiveis: horarioDisponivel[] = [];
  horarioEscolhido: string = '';
  precoServico: number = 5;  
  clientAppointment: any;     
  idUser: number = 1;            
  services: any[] = [];           
  loadingTimes = false;
  loadingSubmit = false;
  loading = true;
  servicosSelect: any[] = []
  servicoCheckState: { [key: number]: boolean } = {};

  


  constructor(private appointmentService: AppointmentService , private route: ActivatedRoute , private client:Client , private servicos:ListAllService , private toast:ToastService) {}
   
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
  this.client.getAcessToken(this.token).subscribe({
    next: (response: ClientResponse) => {
    
      this.clientAppointment = response.client;

       this.loadServices();
      this.loading = false; 
    },
    error: (error) => {
      console.error('Erro ao carregar dados:', error);
      this.loading = false;
    }
  });
}

loadServices(): void {
  if (!this.clientAppointment || !this.clientAppointment.idUser) {
    console.warn("Cliente não encontrado ou sem idUser");
    return;
  }

  const barberId = this.clientAppointment.idUser;

  this.servicos.getServicesByBarber(barberId).subscribe({
    next: (res) => {
      console.log("Serviços do barbeiro:", res.service);
      this.services = res.service; // popula no HTML
    },
    error: (err) => {
      console.error("Erro ao buscar serviços:", err);
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
      next: (response: horarioDisponivel[]) => {

        this.horariosDisponiveis = response; // response is the array
        this.loadingTimes = false;
      },
      error: () => {
        this.toast.error('Erro ao carregar horários disponíveis')
        this.loadingTimes = false;
      }
    });
}

 agendar() {
    if (!this.horarioEscolhido || !this.dataSelecionada) {
      this.toast.error('Selecione data e horário!')
      return;
    }

    const hoje = new Date();
      hoje.setHours(0,0,0,0);
      const dataSelecionada = new Date(this.dataSelecionada);
      dataSelecionada.setHours(0,0,0,0);

     if (dataSelecionada < hoje) {
       this.toast.error('Não é possível agendar para datas passadas!');
      return;
     }

      if(this.servicosSelect.length === 0) {
        this.toast.error('Selecione pelo menos um serviço!')
    return;
  }

   const horarioObj = this.horariosDisponiveis.find(h => h.idDispo === Number(this.horarioEscolhido));

    const novoAgendamento: Appointment = {
      data: this.dataSelecionada,
      horario: horarioObj ? horarioObj.horario : '',
      preco: this.precoServico,
      idClient: this.clientAppointment.idClient,
      idUser: this.idUser,
      idServi: this.servicosSelect,
      status: 'Agendado'
    };

    console.log('agenda' , novoAgendamento)
  

    this.loadingSubmit = true;
    this.appointmentService.createAppointment(novoAgendamento)
      .subscribe({
        next: () => {
          this.toast.success('Agendamento realizado com sucesso!')
          
          this.horarioEscolhido = '';
          this.horariosDisponiveis = [];
          this.loadingSubmit = false;
        },
        error: (err) => {
          this.toast.error(err.error?.error || 'Erro ao realizar agendamento')
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

    this.servicosSelect = [Number(serviceId)];

    this.servicoCheckState = {};
    this.servicoCheckState[serviceId] = true;
  } else {
    this.servicosSelect = [];
    this.servicoCheckState[serviceId] = false;
  }
}

onCheckboxChange(event: Event, serviceId: number) {

  const checked = (event.target as HTMLInputElement).checked;
  this.toggleServicoSelecionado(serviceId, checked);
}


isSelecionado(serviceId: number): boolean {
  return this.servicosSelect.includes(serviceId);
}

}
