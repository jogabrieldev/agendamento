import { Component, OnInit } from '@angular/core';
import { ListAllService , Service } from '../../../service/listAllService';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-list-service',
   standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, NgxMaskDirective],
  templateUrl: './list-service.component.html',
  styleUrl: './list-service.component.css'
})
export class ListServiceComponent implements OnInit {

  services: Service[] = [];

   constructor(private listAllService: ListAllService) {}

  ngOnInit(): void {
     this.loadServices();;
  }
  
  loadServices(): void {
    this.listAllService.getAllServices().subscribe({
      next: (res) => {
        console.log('Serviços recebidos:', res.service);
        this.services = res.service;
      },
      error: (error) => {
        console.error('Erro ao carregar serviços:', error);
      }
    });
  }

   deleteHours(id: number): void {
  if (confirm('Tem certeza que deseja excluir este horário?')) {
    this.listAllService.deleteService(id).subscribe({
      next: () => {
        // Após deletar com sucesso, atualiza a lista local
        this.services = this.services.filter(s => s.idServi !== id);
        alert('Serviço deletado com sucesso!')
        console.log('Serviço deletado com sucesso!');
      },
      error: (error) => {
        console.error('Erro ao deletar horário:', error);
      }
    });
  }
}

selectedService: Service | null = null;

openEditForm(servico: Service): void {
  this.selectedService = { ...servico }; // Faz uma cópia para evitar edição direta na lista
}

saveService(): void {
  if (!this.selectedService) return;

  const updatedService = {
    name: this.selectedService.name,
    descricao: this.selectedService.descricao,
    duracao: this.selectedService.duracao,
    price: this.selectedService.price
  };

  this.listAllService.updateService(this.selectedService.idServi, updatedService).subscribe({
    next: () => {
      console.log('Serviço atualizado com sucesso');
      alert('Serviço atualizado com sucesso')
      this.loadServices();
      this.selectedService = null;
    },
    error: (error) => {
      console.error('Erro ao atualizar serviço:', error);
      alert('Erro na atualização do serviço')
    }
  });
}


}
