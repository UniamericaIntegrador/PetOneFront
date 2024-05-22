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

export const routes: Routes = [
    {path: "", redirectTo:"login", pathMatch:"full"},
    {path: "login", component: LoginComponent},
    {path: "admin", component: PrincipalComponent, children:[
        {path: "dashboard", component: DashboardComponent},
        {path: "pacientes", component: PacienteslistComponent},
        {path: "procedimentos", component: ProcedimentoslistComponent},
        {path: "tutores", component: TutoreslistComponent},
        {path: "veterinarios", component: VeterinarioslistComponent},
        {path: "pacientes/new", component: PacientesdetailsComponent},
        {path: "pacientes/edit/:id", component: PacientesdetailsComponent},
        {path: "procedimentos/new", component: ProcedimentosdetailsComponent},
        {path: "procedimentos/edit/:id", component: ProcedimentosdetailsComponent},
        {path: "tutores/new", component: TutoresdetailsComponent},
        {path: "tutores/edit/:id", component: TutoresdetailsComponent},
        {path: "veteterinarios/new", component: VeterinariosdetailsComponent},
        {path: "veterinarios/edit/:id", component: VeterinariosdetailsComponent}
    ]}
];
