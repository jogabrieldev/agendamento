import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { clientService } from '../../../service/acessClient';
import { RouterModule } from '@angular/router';
import { AppointmentComponent } from '../appointment/appointment.component';

@Component({
  standalone: true,
  selector: 'app-acess-client',
  imports: [CommonModule , FormsModule , RouterModule ],
  templateUrl: './acess-client.component.html',
  styleUrl: './acess-client.component.css'
})
export class AcessClientComponent implements OnInit {

    token:string =''
    client: any = null;
    services: any[] = [];
    clientData = {name: '' ,telefone: ''}
    showForm = false
    success = false
    loading = true;

    constructor(
    private route: ActivatedRoute,
    private clientService: clientService,
    private router: Router
  ) {}

  ngOnInit(): void {

  this.route.paramMap.subscribe(params => {
    const tokenParam = params.get('token');
    if (tokenParam) {
      this.token = tokenParam;
      console.log('Token capturado:', this.token);
      this.loadClientAndServices();
    }
  });
}

  loadClientAndServices() {
  this.clientService.getClientByToken(this.token ).subscribe({
    next: (response) => {
      this.client = response.client;
      this.services = response.servico || [];

      // Se o cliente não tem nome ou telefone, exibe formulário
      if (this.client.name && this.client.telefone) {
        this.router.navigate(["/agendamento" , this.token])
      } else {
        this.showForm = true
      }

      this.loading = false;
    },
    error: (error) => {
      console.error('Erro ao carregar cliente:', error);
      this.loading = false;
    }
  });
}
 saveClient() {
  const data = {
    name: this.clientData.name,
    telefone: this.clientData.telefone
  };

  this.clientService.updateClientByToken(this.token, data).subscribe({
    next: (response) => {
      console.log('Cliente atualizado com sucesso!');
      alert('Cadastro finalizado com sucesso!');
      this.showForm = false;
      this.loadClientAndServices();
    },
    error: (error) => {
      console.error('Erro ao salvar cliente:', error);
      alert('Erro ao finalizar cadastro.');
    }
  });
}
}
