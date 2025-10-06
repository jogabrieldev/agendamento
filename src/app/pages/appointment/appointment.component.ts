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
  jwtToken:String = ""
  servicosSelect: any[] = []
  servicoCheckState: { [key: number]: boolean } = {};

  


  constructor(private appointmentService: AppointmentService , private route: ActivatedRoute , private client:Client , private servicos:ListAllService , private toast:ToastService, private router:Router, ) {}
   
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
       this.jwtToken = response.token
      console.log("token" , this.jwtToken)
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

  this.servicos.getServicesByBarber(barberId , this.jwtToken).subscribe({
    next: (res) => {
      this.services = res.service; 
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

        this.horariosDisponiveis = response; 
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
    this.toast.error('Selecione data e horário!');
    return;
  }

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const partes = this.dataSelecionada.split('-').map(Number); // YYYY-MM-DD
  const dataSelecionada = new Date(partes[0], partes[1] - 1, partes[2]);
  dataSelecionada.setHours(0, 0, 0, 0);

  if (dataSelecionada < hoje) {
    this.toast.error('Não é possível agendar para datas passadas!');
    return;
  }

  if (this.servicosSelect.length === 0) {
    this.toast.error('Selecione pelo menos um serviço!');
    return;
  }

  const horarioObj = this.horariosDisponiveis.find(h => h.idDispo === Number(this.horarioEscolhido));
  if (!horarioObj) {
    this.toast.error('Horário inválido!');
    return;
  }

  // Cria Date completo da data selecionada + horário, de forma confiável no horário local
  const dataHoraSelecionada = new Date(`${this.dataSelecionada}T${horarioObj.horario}:00`);
  const agora = new Date();

  if (dataHoraSelecionada < agora) {
    this.toast.error('Não é possível agendar horários já passados!');
    return;
  }
  const servicoSelecionado = this.services.find(
  s => s.idServi === Number(this.servicosSelect[0])
);
if (!servicoSelecionado) {
  this.toast.error('Serviço inválido ou não encontrado!');
  return;
}

const precoServico = servicoSelecionado.price;
  

  const novoAgendamento: Appointment = {
    data: this.dataSelecionada,
    horario: horarioObj ? horarioObj.horario : '',
    preco: precoServico,
    idClient: this.clientAppointment.idClient,
    idUser: this.idUser,
    idServi: Number(this.servicosSelect[0]),
    status: 'Agendado'
  };

  this.loadingSubmit = true;
  this.appointmentService.createAppointment(novoAgendamento)
    .subscribe({
      next: () => {
        this.toast.success('Agendamento realizado com sucesso!');
        this.horarioEscolhido = '';
        this.horariosDisponiveis = [];
        this.loadingSubmit = false;
        this.router.navigate(["cliente/cadastro"]);
      },
      error: (err) => {
        console.error(err);
        this.loadingSubmit = false;
         const mensagem = err?.error?.message || "Erro ao fazer o agendamento! Tente novamente.";

      this.toast.error(mensagem);
      console.error('Erro no agendamento:', err);
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
