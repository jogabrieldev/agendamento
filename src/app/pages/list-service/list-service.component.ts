import { Component, OnInit } from '@angular/core';
import { ListAllService , Service } from '../../../service/listAllService';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-service',
   standalone: true,
  imports: [RouterModule , CommonModule , FormsModule],
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
  
     
     
}
