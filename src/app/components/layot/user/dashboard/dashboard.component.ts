import { Component, inject, Inject } from '@angular/core';
import { PacienteslistComponent } from "../../../pacientes/pacienteslist/pacienteslist.component";
import { Paciente } from '../../../../models/paciente';
import { LoginService } from '../../../../auth/login.service';
import { Tutor } from '../../../../models/tutor';
import { PacienteService } from '../../../../services/paciente.service';
import { Procedimento } from '../../../../models/procedimento';
import { MatTableModule } from '@angular/material/table';
import { AgendamentolistComponent } from "../../../agendamento/agendamentolist/agendamentolist.component";
import { RouterModule } from '@angular/router';
import { Agendamento } from '../../../../models/agendamento';
import { AgendamentoService } from '../../../../services/agendamento.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PacienteslistComponent, MatTableModule, AgendamentolistComponent, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class UserDashboardComponent {

  loginService = Inject(LoginService);
  pacienteService = inject(PacienteService);
  agendamentoService = inject(AgendamentoService);
  paciente: Paciente[] = [];
  agendamentos: Agendamento[] = [];
  usuario!: Tutor;
  _agendamentos: number = 0;
  pacientes: number = 0;

  pacientesList: Paciente[] = [];

  constructor() {
    this.loadUserPets();
  }

  loadUserPets() {
    this.pacienteService.findByTutor().subscribe({
      next: data => {
        this.paciente = data;
        this.loadLength();
      }
    });
  }

  loadLength() {
    this.agendamentoService.findByTutor(1).subscribe({
      next: lista => {
        this.agendamentos = lista;
      },
    });
  }

}
