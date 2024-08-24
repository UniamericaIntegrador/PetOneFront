import { Component, inject, Inject } from '@angular/core';
import { PacienteslistComponent } from "../../../pacientes/pacienteslist/pacienteslist.component";
import { Paciente } from '../../../../models/paciente';
import { LoginService } from '../../../../auth/login.service';
import { Tutor } from '../../../../models/tutor';
import { PacienteService } from '../../../../services/paciente.service';
import { Procedimento } from '../../../../models/procedimento';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PacienteslistComponent, MatTableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class UserDashboardComponent {

  loginService = Inject(LoginService);
  pacienteService = inject(PacienteService);
  paciente: Paciente[] = [];
  procedimentos: Procedimento[ ] = [];
  usuario!: Tutor;
  
  pacientesList: Paciente[] = [];

  constructor() {
    this.loadUserPets();
  }

  loadUserPets(){
    this.pacienteService.findByTutor().subscribe({
      next: data => {
        this.paciente = data;
      }
    });
  }




}
