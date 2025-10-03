import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { HoursComponent } from './pages/hours/hours.component';
import { ListServiceComponent } from './pages/list-service/list-service.component';
import { AccessClientComponent } from './pages/access-client/access-client.component';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { ClientRegisterComponent } from './pages/client-register/client-register.component';
import { GenerateQrcodeComponent } from './pages/generate-qrcode/generate-qrcode.component';
import { PendingClientComponent } from './pages/pending-client/pending-client.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {path: 'home' , component: HomeComponent, canActivate: [authGuard]},
  { path: 'register', component: RegisterComponent , canActivate: [authGuard] },
  {path: 'hours' , component: HoursComponent , canActivate:[authGuard]},
  {path: 'listService' , component:ListServiceComponent , canActivate:[authGuard]},
  {path:"cliente/cadastro" , component:ClientRegisterComponent },
  {path:"agendamento/:token" , component:AppointmentComponent  },
  {path:"pendencia/client" , component:PendingClientComponent},
  {path:"client/acesso" , component:AccessClientComponent},
  {path:'qrcode' , component:GenerateQrcodeComponent}
];

