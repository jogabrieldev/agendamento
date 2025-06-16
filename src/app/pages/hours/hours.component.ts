import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Horario, ListHoursService } from '../../../service/listAllHours';

@Component({
  selector: 'app-hours',
   standalone: true,
  imports: [RouterModule ,FormsModule , CommonModule],
  templateUrl: './hours.component.html',
  styleUrl: './hours.component.css'
})
export class HoursComponent implements OnInit {
    
   horarios:Horario[] = []
   
   constructor(private listHoursService: ListHoursService) {}
    
    ngOnInit(): void {
    this.carregarHorarios();
  }
   
    carregarHorarios(): void {
    this.listHoursService.getAllHours().subscribe({
     next: (response) => {
      console.log('Resposta da API:', response);
      this.horarios = response.horarios;
    },
      error: (error) => {
        console.error('Erro ao carregar os horários:', error);
      }
    });
  }


}
