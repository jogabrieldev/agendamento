import { Injectable } from '@angular/core';
import Toastify from 'toastify-js';

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
