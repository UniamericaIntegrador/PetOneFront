import { Routes } from '@angular/router';
import { LoginComponent } from './components/layot/login/login.component';
import { PrincipalComponent } from './components/layot/principal/principal.component';
import { PacienteslistComponent } from './components/pacientes/pacienteslist/pacienteslist.component';
import { ProcedimentoslistComponent } from './components/procedimentos/procedimentoslist/procedimentoslist.component';
import { TutoreslistComponent } from './components/tutores/tutoreslist/tutoreslist.component';
import { PacientesdetailsComponent } from './components/pacientes/pacientesdetails/pacientesdetails.component';
import { VeterinarioslistComponent } from './components/veterinarios/veterinarioslist/veterinarioslist.component';
import { ProcedimentosdetailsComponent } from './components/procedimentos/procedimentosdetails/procedimentosdetails.component';
import { TutoresdetailsComponent } from './components/tutores/tutoresdetails/tutoresdetails.component';
import { VeterinariosdetailsComponent } from './components/veterinarios/veterinariosdetails/veterinariosdetails.component';
import { DashboardComponent } from './components/layot/dashboard/dashboard.component';
import { UserDashboardComponent } from './components/layot/user/dashboard/dashboard.component';
import { loginGuard } from './auth/login.guard';
import { LogsComponent } from './components/logs/logs.component';
import { AgendamentodetailComponent } from './components/agendamento/agendamentodetail/agendamentodetail.component';
import { AgendamentolistComponent } from './components/agendamento/agendamentolist/agendamentolist.component';
import { HomeComponent } from './components/home/home/home.component';

export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "user", component: PrincipalComponent, canActivate: [loginGuard], children: [
      { path: "home", component: HomeComponent, data: { title: 'Home' } },
      { path: "dashboard", component: UserDashboardComponent, data: { title: 'Dashboard' } },
      { path: "pacientes", component: PacienteslistComponent, data: { title: 'Pacientes' } },
      { path: "procedimentos", component: ProcedimentoslistComponent, data: { title: 'Procedimentos' } },
      { path: "veterinarios", component: VeterinarioslistComponent, data: { title: 'Veterinários' } },
      { path: "pacientes/new", component: PacientesdetailsComponent, data: { title: 'Novo Paciente' } },
      { path: "pacientes/edit/:id", component: PacientesdetailsComponent, data: { title: 'Editar Paciente' } },
      { path: "tutores/edit/:id", component: TutoresdetailsComponent, data: { title: 'Editar Tutor' } },
      { path: "agendamento/edit/:id", component: AgendamentodetailComponent, data: { title: 'Editar Agendamentos' }},
      { path: "agendamento/edit/new", component: AgendamentodetailComponent, data: { title: 'Editar Agendamentos' }},
      { path: "agendamento", component: AgendamentolistComponent, data: { title: 'Agendamentos' }},
    ]},
    { path: "admin", component: PrincipalComponent, canActivate: [loginGuard], children: [
      { path: "dashboard", component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: "pacientes", component: PacienteslistComponent, data: { title: 'Pacientes' } },
      { path: "procedimentos", component: ProcedimentoslistComponent, data: { title: 'Procedimentos' } },
      { path: "agendamentos", component: AgendamentolistComponent, data: { title: 'Agendamentos' } },
      { path: "agendamento/edit/:id", component: AgendamentodetailComponent, data: { title: 'Editar Agendamentos' }},
      { path: "agendamento/edit/new", component: AgendamentodetailComponent, data: { title: 'Editar Agendamentos' }},
      { path: "tutores", component: TutoreslistComponent, data: { title: 'Tutores' } },
      { path: "veterinarios", component: VeterinarioslistComponent, data: { title: 'Veterinários' } },
      { path: "pacientes/new", component: PacientesdetailsComponent, data: { title: 'Novo Paciente' } },
      { path: "pacientes/edit/:id", component: PacientesdetailsComponent, data: { title: 'Editar Paciente' } },
      { path: "procedimentos/new", component: ProcedimentosdetailsComponent, data: { title: 'Novo Procedimento' } },
      { path: "procedimentos/edit/:id", component: ProcedimentosdetailsComponent, data: { title: 'Editar Procedimento' } },
      { path: "tutores/new", component: TutoresdetailsComponent, data: { title: 'Novo Tutor' } },
      { path: "tutores/edit/:id", component: TutoresdetailsComponent, data: { title: 'Editar Tutor' } },
      { path: "veterinarios/new", component: VeterinariosdetailsComponent, data: { title: 'Novo Veterinário' } },
      { path: "veterinarios/edit/:id", component: VeterinariosdetailsComponent, data: { title: 'Editar Veterinário' } },
      { path: "logs", component: LogsComponent, data: { title: 'Logs' } }
    ]}
  ];
