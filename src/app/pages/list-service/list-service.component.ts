import { Component, OnInit } from '@angular/core';
import { ListAllService , Service } from '../../../service/listAllService';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { ToastService , ConfirmService } from '../../../service/serviceStyle';

@Component({
  selector: 'app-list-service',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, NgxMaskDirective],
  templateUrl: './list-service.component.html',
  styleUrl: './list-service.component.css'
})
export class ListServiceComponent implements OnInit {

  services: Service[] = [];

   constructor(private listAllService: ListAllService , private toast:ToastService , private confirm:ConfirmService) {}

  ngOnInit(): void {
     this.loadServices();;
  }
  
  loadServices(): void {
    this.listAllService.getAllServices().subscribe({
      next: (res) => {
  
        this.services = res.service;
      },
      error: (error) => {
        console.error('Erro ao carregar serviços:', error);
      }
    });
  }

   deleteService(id: number): void {

    this.confirm.confirm(
    'Excluir esse serviço',
    'Deseja realmente excluir este SERVIÇO?',
    'Sim, excluir',
    'Não').then((confirm)=>{
         if(confirm){
              this.listAllService.deleteService(id).subscribe({
         next: () => {
          this.services = this.services.filter(s => s.idServi !== id);
           this.toast.success('Serviço deletado com sucesso!');
       },
         error: (error) => {
            this.toast.error('Erro ao deletar serviço!')
            console.error('Erro ao deletar horário:', error);
         }
        });
       }else{
         console.error('Usuario não quis excluir')
         return
       }
    })
}

selectedService: Service | null   = null;

openEditForm(servico: Service): void {
  this.selectedService = { ...servico } ; 
}

saveService(): void {
  if (!this.selectedService) return;

  const updatedService = {
    name: this.selectedService?.name,
    descricao: this.selectedService?.descricao,
    duracao: this.selectedService?.duracao,
    price: this.selectedService?.price
  };
   
  this.confirm.confirm(
     "Atualizar esse serviço" ,
     `Deseja realmente atualizar o serviço: (${this.selectedService?.name})`,
     "Atualizar",
     "Cancelar"
  ).then((confirm)=>{
      if(confirm){

        if (this.selectedService?.idServi == null) {
         this.toast.error('ID do serviço inválido');
         return;
      }

        this.listAllService.updateService(this.selectedService.idServi, updatedService).subscribe({
         next: () => {
          this.toast.success('Serviço atualizado com sucesso!');
           this.loadServices();
           this.selectedService = null;
       },
     error: (error) => {
       console.error('Erro ao atualizar serviço:', error);
       this.toast.error('Erro na atualização do serviço')
     }
        });
      };
  });
  
}


}
