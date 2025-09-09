import { Injectable } from '@angular/core';
import Toastify from 'toastify-js';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class ToastService {
  success(message: string) {
    Toastify({
      text: message,
      duration: 3000,
      gravity: "top",
      position: "center",
      close: true,
      style: { background: "#4caf50" }
    }).showToast();
  }

  error(message: string) {
    Toastify({
      text: message,
      duration: 3000,
      gravity: "top",
      position: "center",
      close: true,
      style: { background: "#f44336" }
    }).showToast();
  }
}

@Injectable({ providedIn: 'root' })
export class ConfirmService {
  confirm(
    title: string = 'Tem certeza?',
    text: string = 'Essa ação não pode ser desfeita.',
    confirmButtonText: string = 'Sim',
    cancelButtonText: string = 'Cancelar'
  ): Promise<boolean> {
     const confirmColor = confirmButtonText.toLowerCase().includes('atualizar')
      ? '#22C55E' 
      : '#EF4444'; 
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText,
      confirmButtonColor:confirmColor,
      cancelButtonText,
      cancelButtonColor:"#6B7280",
      reverseButtons: true,
    }).then((result) => result.isConfirmed);
  }
}
