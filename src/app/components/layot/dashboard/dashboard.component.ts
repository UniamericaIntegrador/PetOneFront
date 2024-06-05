import { Component, ViewChild, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { PacienteslistComponent } from '../../pacientes/pacienteslist/pacienteslist.component';
import { TutoreslistComponent } from '../../tutores/tutoreslist/tutoreslist.component';
import { ProcedimentoslistComponent } from '../../procedimentos/procedimentoslist/procedimentoslist.component';
import { VeterinarioslistComponent } from '../../veterinarios/veterinarioslist/veterinarioslist.component';
import { DashboardService } from '../../../services/dashboard.service';
import ApexCharts from 'apexcharts'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, PacienteslistComponent, TutoreslistComponent, ProcedimentoslistComponent, VeterinarioslistComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  PacienteCount!: number;
  VeterinarioCount!: number;
  TutorCount!: number;
  ProcedimentoCount!: number;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.fetchCounts();
    this.grafico();
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

  grafico() {
    var options = {
      chart: {
        type: 'bar'
      },
      series: [{
        data: [1, this.TutorCount, this.PacienteCount, this.VeterinarioCount, this.ProcedimentoCount]
      }],
      xaxis: {
        categories: ["Tutores", "Pacientes", "Veterinarios", "Procedimentos"]
      }
    }
    
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    
    chart.render();
  }
}