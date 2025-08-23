import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Appointment, AppointmentService } from '../../../service/appointmentService';

@Component({
  selector: 'app-home',
  imports: [RouterModule , CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    
  userName: string = '';
 appointments:Appointment[]= []
 

   constructor(private appointmentService: AppointmentService) {}
  ngOnInit(): void {
    this.userName = localStorage.getItem('userName') || '';

    // this.appointmentService.getAppointments().subscribe({
    //   next: (data) => {
    //     this.appointments = data;
    //   },
    //   error: (err) => {
    //     console.error('Erro ao buscar agendamentos', err);
    //   }
    // });
  }
}
