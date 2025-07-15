import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Horario, ListHoursService } from '../../../service/listAllHours';
import { ToastService } from '../../../service/serviceStyle';

@Component({
  selector: 'app-hours',
   standalone: true,
  imports: [RouterModule ,FormsModule , CommonModule],
  templateUrl: './hours.component.html',
  styleUrl: './hours.component.css'
})
export class HoursComponent implements OnInit {
    
   horarios:Horario[] = []
   
   constructor(private listHoursService: ListHoursService , private toast:ToastService) {}
    
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
  if (confirm('Tem certeza que deseja excluir este horário?')) {
    this.listHoursService.deleteHours(id).subscribe({
      next: () => {
        // Após deletar com sucesso, atualiza a lista local
        this.horarios = this.horarios.filter(h => h.idDispo !== id);
        this.toast.success('Horário deletado com sucesso!');
      },
      error: (error) => {
        console.error('Erro ao deletar horário:', error);
        this.toast.error('Erro ao deletar horário');
      }
    });
  }
}

selectedHour: Horario | null = null;

openEditForm(horario: Horario): void {
  this.selectedHour = { ...horario };
}


saveHour(): void {
  if (!this.selectedHour) return;

  const updatedHour = {
    horario: this.selectedHour.horario,
    status: this.selectedHour.status
  };

  this.listHoursService.updateHour(this.selectedHour.idDispo, updatedHour).subscribe({
    next: () => {
      console.log('Horário atualizado com sucesso');
      this.toast.success("horario atualizado com sucesso")
      this.carregarHorarios();
      this.selectedHour = null;  // Fecha o formulário de edição
    },
    error: (error) => {
      console.error('Erro ao atualizar horário:', error);
      this.toast.error('Erro ao atualizar horario!')
    }
  });
}





}
