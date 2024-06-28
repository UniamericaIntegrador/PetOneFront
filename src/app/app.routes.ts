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
import { loginGuard } from './auth/login.guard';
import { EspecielistComponent } from './components/especies/especielist/especielist.component';
import { Title } from 'chart.js';

export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "admin", component: PrincipalComponent, canActivate: [loginGuard], children: [
      { path: "dashboard", component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: "pacientes", component: PacienteslistComponent, data: { title: 'Pacientes' } },
      { path: "especies", component: EspecielistComponent, data: { title: 'Especies'}},
      { path: "procedimentos", component: ProcedimentoslistComponent, data: { title: 'Procedimentos' } },
      { path: "tutores", component: TutoreslistComponent, data: { title: 'Tutores' } },
      { path: "veterinarios", component: VeterinarioslistComponent, data: { title: 'Veterinários' } },
      { path: "pacientes/new", component: PacientesdetailsComponent, data: { title: 'Novo Paciente' } },
      { path: "pacientes/edit/:id", component: PacientesdetailsComponent, data: { title: 'Editar Paciente' } },
      { path: "procedimentos/new", component: ProcedimentosdetailsComponent, data: { title: 'Novo Procedimento' } },
      { path: "procedimentos/edit/:id", component: ProcedimentosdetailsComponent, data: { title: 'Editar Procedimento' } },
      { path: "tutores/new", component: TutoresdetailsComponent, data: { title: 'Novo Tutor' } },
      { path: "tutores/edit/:id", component: TutoresdetailsComponent, data: { title: 'Editar Tutor' } },
      { path: "veterinarios/new", component: VeterinariosdetailsComponent, data: { title: 'Novo Veterinário' } },
      { path: "veterinarios/edit/:id", component: VeterinariosdetailsComponent, data: { title: 'Editar Veterinário' } }
    ]}
  ];
