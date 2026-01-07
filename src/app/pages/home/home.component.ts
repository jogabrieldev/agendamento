import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { Appointment, AppointmentService } from '../../../service/appointmentService';
import { ToastService } from '../../../service/serviceStyle';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [RouterModule , CommonModule , FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    
  userName: string = '';
  appointments:Appointment[]= []
  private deleteModal: any;
  codeValid: number | null = null

   constructor(private appointmentService: AppointmentService, private toast:ToastService) {}
  ngOnInit(): void {
    this.userName = localStorage.getItem('userName') || '';

    //   const modalEl = document.getElementById('deleteModal');
    // if(modalEl) {
    //   this.deleteModal = new bootstrap.Modal(modalEl);
    // }
  }
  // openDeletePopup() {
  //   if(this.deleteModal) {
  //     this.deleteModal.show();
  //   }
  // }

//   confirmDelete() {
   
//   if(!this.codeValid){
//      this.toast.error("Digite um código válido de 6 dígitos.")
//      return
//   }

//   this.appointmentService.cancelAppointment(this.codeValid).subscribe({
//     next: () => {
//       this.deleteModal.hide();
//       this.toast.success("Agendamento cancelado com sucesso!")
   
//     },
//     error: (err) => {
//      console.error('Erro ao cancelar agendamento', err);

//       if (err.error && err.error.message) {
//         this.toast.error(err.error.message);
//       } else if (err.error && err.error.error) {
        
//         this.toast.error(err.error.error);
//       } else {
//         this.toast.error('Erro ao cancelar o agendamento.');
//       }
//     }
//   });
// }

}
