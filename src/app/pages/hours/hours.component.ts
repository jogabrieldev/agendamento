import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Horario, ListHoursService } from '../../../service/listAllHours';
import { ToastService , ConfirmService} from '../../../service/serviceStyle';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-hours',
   standalone: true,
  imports: [RouterModule ,FormsModule , CommonModule],
  templateUrl: './hours.component.html',
  styleUrl: './hours.component.css'
})
export class HoursComponent implements OnInit {
    
   horarios:Horario[] = []
   indisponiveis: any[] = [];
   
   constructor(private listHoursService: ListHoursService , private toast:ToastService ,private confirm:ConfirmService) {}
    
    ngOnInit(): void {
    this.carregarHorarios();
  }
   
    carregarHorarios(): void {
    this.listHoursService.getAllHours().subscribe({
     next: (response) => {
      this.horarios = response.horarios;
    },
      error: (error) => {
        console.error('Erro ao carregar os horários:', error);
      }
    });
  }

  deleteHours(id: number): void {

    this.confirm.confirm(
    'Excluir esse horario',
    'Deseja realmente excluir este HORARIO?',
    'Sim, excluir',
    'Não'
  ).then((confirmed) => {
    if (confirmed) {
      this.listHoursService.deleteHours(id).subscribe({
      next: () => {
     
        this.horarios = this.horarios.filter(h => h.idDispo !== id);
        this.toast.success('Horário deletado com sucesso!');
      },
      error: (error) => {
        console.error('Erro ao deletar horário:', error);
        this.toast.error('Erro ao deletar horário');
      }
    });
    } else {
      console.log('Usuário cancelou.');
      return
      
    }
  });
}

selectedHour: Horario | null = null;

openEditForm(horario: Horario): void {
  this.selectedHour = { ...horario };
}

openIndisponiveis(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.toast.error("Usuário não encontrado!");
      return;
    }

    this.listHoursService.getIndisponiveis(userId).subscribe({
      next: (response) => {
        this.indisponiveis = response.horarios;
        const modalElement = document.getElementById('modalIndisponiveis');
        if (modalElement) {
          const modal = new bootstrap.Modal(modalElement);
          modal.show();
        } else {
          this.toast.error("Modal de indisponíveis não encontrado!");
        }
      },
      error: (error) => {
        console.error('erro', error)
        console.error('Erro ao carregar horários indisponíveis:', error);
        this.toast.error("Erro ao carregar indisponíveis!");
      }
    });
  }

saveHour(): void {
  if (!this.selectedHour) return;

  if (this.selectedHour.status === "Indisponível" && this.selectedHour.dataIndisponivel) {
    const payload = {
      status: this.selectedHour.status,
      horario: this.selectedHour.horario,
      dataIndisponivel: this.selectedHour.dataIndisponivel,
      idUser: localStorage.getItem("userId") 
    };

    this.listHoursService.indisponible(payload).subscribe({
      next: () => {
        this.toast.success("Indisponibilidade registrada!");
        this.carregarHorarios();
        this.selectedHour = null; 
      },
      error: (error) => {
        console.error('Erro ao registrar indisponibilidade:', error);
         if (error.status === 400 && error.error?.message) {
          this.toast.error(error.error.message); 
        } else {
         this.toast.error("Erro ao registrar indisponibilidade!");
        }
        this.toast.error("Erro ao registrar indisponibilidade!");
      }
    });
  } else {
    this.toast.error("Para salvar, selecione status 'Indisponível' e informe uma data.");
  }
}

}
