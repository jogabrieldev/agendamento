import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetQrcode } from '../../../service/getQrcodeService';
import { ToastService } from '../../../service/serviceStyle';

@Component({
  selector: 'app-generate-qrcode',
  imports: [CommonModule],
  templateUrl: './generate-qrcode.component.html',
  styleUrl: './generate-qrcode.component.css'
})
export class GenerateQrcodeComponent implements OnInit {
      qrCode: string | null = null;

  constructor(private whatsappService: GetQrcode , private toast:ToastService) {}

   ngOnInit() {
    this.loadQRCode();
  }

  loadQRCode() {
    this.whatsappService.getQRCode().subscribe({
      next: (res) => {
        this.qrCode = res.qr; 
      },
      error: (err) => {
        this.toast.error('Erro ao buscar QRCODE para conexão!')
        console.error('Erro ao buscar QR Code:', err);
      }
    });
  }
}
