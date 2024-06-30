import { Component, ViewChild, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { PacienteslistComponent } from '../../pacientes/pacienteslist/pacienteslist.component';
import { TutoreslistComponent } from '../../tutores/tutoreslist/tutoreslist.component';
import { ProcedimentoslistComponent } from '../../procedimentos/procedimentoslist/procedimentoslist.component';
import { VeterinarioslistComponent } from '../../veterinarios/veterinarioslist/veterinarioslist.component';
import { DashboardService } from '../../../services/dashboard.service';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../../auth/login.service';
import { PacienteService } from '../../../services/paciente.service';
import { Paciente } from '../../../models/paciente';
import { Tutor } from '../../../models/tutor';
import { TutorService } from '../../../services/tutor.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, PacienteslistComponent, TutoreslistComponent, ProcedimentoslistComponent, VeterinarioslistComponent, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  PacienteCount!: number;
  VeterinarioCount!: number;
  TutorCount!: number;
  ProcedimentoCount!: number;

  tutorService = inject(TutorService);
  pacienteService = inject(PacienteService);

  lista: Paciente[] = [];


  listaPacientesTutor: Paciente[] = [];

  //first: boolean = true;

  usuario!: Tutor;

  tutor!: Tutor;

  loginService = inject(LoginService);


  constructor(private dashboardService: DashboardService) { 
    this.tutor = this.loginService.getUsuarioLogado();
    this.reloadTutor();
    this.listarPacientesUser();
  }

  ngOnInit() {
    this.fetchCounts();
  }

  fetchCounts() {
    this.dashboardService.getPacientesCount().subscribe(
      count => this.PacienteCount = count,
      error => console.error('Erro ao buscar contagem de pacientes', error)
    );

    this.dashboardService.getTutoresCount().subscribe(
      count => this.TutorCount = count,
      error => console.error('Erro ao buscar contagem de tutores', error)
    );

    this.dashboardService.getVeterinariosCount().subscribe(
      count => this.VeterinarioCount = count,
      error => console.error('Erro ao buscar contagem de veterinários', error)
    );

    this.dashboardService.getProcedimentosCount().subscribe(
      count => this.ProcedimentoCount = count,
      error => console.error('Erro ao buscar contagem de procedimentos', error)
    );
  }

  reloadTutor(){
    this.tutorService.findByEmail(this.tutor.username).subscribe({
      next: retorno =>{
        this.usuario = retorno;
      }
    });
  }

  calcular(count: number){
    return count = count * 5;
  }
  
  listarPacientesUser(){
    this.pacienteService.listAll().subscribe({
      next: resultado =>{
        this.lista = resultado;
      }
    });
    
    /*
    for(let i = 0; i < this.lista.length; i++){
      if(this.lista[i].tutor.username == this.tutor.username){
        this.listaPacientesTutor.push(this.lista[i]);
        console.log(this.listaPacientesTutor);
      }
    }
    */
  }

}