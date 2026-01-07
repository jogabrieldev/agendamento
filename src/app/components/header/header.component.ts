import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../../service/appointmentService';
import { ToastService } from '../../../service/serviceStyle';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  private deleteModal: any;
  public codeValid: number | null = null;

  constructor(private appointmentService: AppointmentService, private toast: ToastService) {}

  ngOnInit(): void {
    const modalEl = document.getElementById('deleteModal');
    if (modalEl) {
      this.deleteModal = new bootstrap.Modal(modalEl);
    }
  }

  openDeletePopup() {
    this.deleteModal?.show();
  }

  confirmDelete() {
    if (!this.codeValid) {
      this.toast.error("Digite um código válido.");
      return;
    }
    this.appointmentService.cancelAppointment(this.codeValid).subscribe({
      next: () => {
        this.deleteModal.hide();
        this.toast.success("Agendamento cancelado!");
        this.codeValid = null;
      },
      error: (err) => this.toast.error("Erro ao cancelar.")
    });
  }

  fecharMenu(menu: HTMLElement) {
    if (menu.classList.contains('show')) {
      const bootstrapCollapse = new bootstrap.Collapse(menu);
     bootstrapCollapse.hide();
    }
  }
}