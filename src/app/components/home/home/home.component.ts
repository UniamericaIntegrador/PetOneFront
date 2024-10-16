import { Component, ChangeDetectorRef, inject, TemplateRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Agendamento } from '../../../models/agendamento';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Paciente } from '../../../models/paciente';
import { PacienteService } from '../../../services/paciente.service';
import { Tutor } from '../../../models/tutor';
import { LoginService } from '../../../auth/login.service';
import { forkJoin } from 'rxjs';
import { AgendamentoService } from '../../../services/agendamento.service';
import { Veterinario } from '../../../models/veterinario';
import { VeterinarioService } from '../../../services/veterinario.service';
import { Logs } from '../../../models/logs';
import { LogsService } from '../../../services/logs.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MdbModalService, MdbModalModule, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Especie } from '../../../models/especie';
import { Raca } from '../../../models/raca';
import { PacientesdetailsComponent } from '../../pacientes/pacientesdetails/pacientesdetails.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MdbModalModule, PacientesdetailsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @Input("esconderBotoes") esconderBotoes: boolean = false;
  @Input("view") view: boolean = true;
  @Output("retorno") retorno = new EventEmitter<any>();

  modalService = inject(MdbModalService);
  @ViewChild("modalPacienteDetalhe") modalPacienteDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  opc!: number;
  agendamentos: Agendamento[] = [];
  veterinarios: Veterinario[] = [];
  tutor!: Tutor;
  nextAgendamento: Agendamento | null = null; // Inicializa como null
  proxAgendamento: Agendamento [] = [];

  logs: Logs[] = []; // Lista completa de logs
  filteredLogs: Logs[] = []; // Lista filtrada de logs
  searchTerm: string = ''; // Termo de pesquisa
  searchDate: string = ''; // Data para filtro
  selectedAcao: string = ''; // Ação selecionada para filtro
  uniqueAcoes: string[] = []; // Lista de ações únicas para o filtro

  totalAgendamentos!: number;
  totalPacientes!: number;

  pacienteService = inject(PacienteService);
  agendamentoService = inject(AgendamentoService);
  veterinarioService = inject(VeterinarioService);
  loginService = inject(LoginService);

  pacientes: Paciente[] = [];

  pacienteEdit: Paciente = new Paciente(0,'', new Date(), new Raca(0,'',new Especie(0,'')),null);

  constructor(private cdr: ChangeDetectorRef, private logService: LogsService) {
    this.tutor = this.loginService.getUsuarioLogado();
    this.opc = 0;
    this.listAllPacientes();
    this.listAllAgendamentos(); // Chamando esta função aqui
    this.listAllVeterinarios();
    //this.loaded();
  }

  navigate(option: number) {
    this.opc = option;
    this.cdr.detectChanges();
    this.listAllPacientes();
    this.listAllAgendamentos(); // Chamando esta função aqui
    if(this.loginService.hasPermission("ADMIN")){
      this.listAllLogs();
    }
    this.listAllLogs();
    this.loaded();
  }

  loaded() {
    console.log(this.agendamentos);
    console.log(this.nextAgendamento);
    console.log(this.veterinarios);
    console.log(this.pacientes);
  }

  listAllPacientes() {
    this.pacienteService.listAll().subscribe({
        next: lista => {
            this.pacientes = this.filtrarPorId(lista, this.tutor.username);
            this.totalPacientes = this.pacientes.length; 
        },
        error: erro => {
            Swal.fire({
                title: "Ocorreu um erro ao exibir a lista de pacientes",
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
    });
}

filtrarPorId(lista: Paciente[], email: string): Paciente[] {
    return lista.filter(paciente => paciente.tutor.email === email);
}


  listAllAgendamentos() {
    this.pacienteService.findByTutor().subscribe({
      next: pacientes => {
        this.pacientes = pacientes;
        const agendamentos = pacientes.map(p =>
          this.agendamentoService.findByTutor(p.id)
        );

        forkJoin(agendamentos).subscribe({
          next: agendamentosPorPaciente => {
            this.agendamentos = []; // Limpa a lista de agendamentos
            agendamentosPorPaciente.forEach(_agendamento => {
              this.agendamentos.push(..._agendamento);
            });

            //console.log('Agendamentos:', this.agendamentos); // Log para depuração

            this.loadPacientes();
            // Atualiza nextAgendamento após os agendamentos serem carregados
            this.nextAgendamento = this.buscarConsultaMaisProxima(this.agendamentos);
            //this.nextAgendamento = this.getClosestDate(this.agendamentos);
            //console.log('Próximo agendamento:', this.nextAgendamento); // Log para verificar o próximo agendamento
          },
          error: erro => {
            Swal.fire({
              title: "Ocorreu um erro ao exibir a lista de agendamento",
              icon: "error",
              confirmButtonText: "Ok"
            });
          }
        });
      },
      error: erro => {
        Swal.fire({
          title: "Ocorreu um erro ao buscar os pacientes",
          icon: "error",
          confirmButtonText: "Ok"
        });
      }
    });
  }


  loadPacientes() {
    const pacienteRequests = this.agendamentos.map(agendamento =>
      this.pacienteService.findById(agendamento.id_paciente)
    );
    forkJoin(pacienteRequests).subscribe({
      next: pacientesDetalhados => {
        this.agendamentos.forEach((agendamento, index) => {
          agendamento.paciente = pacientesDetalhados[index];
        });
      },
      error: erro => {
        Swal.fire({
          title: "Ocorreu um erro ao carregar os pacientes",
          icon: "error",
          confirmButtonText: "Ok"
        });
      }
    });
  }

  listAllVeterinario() {
    //("list all veterinario esta funcionado");
    this.veterinarioService.listAll().subscribe({
      next: lista => {
        this.veterinarios = lista;
      },
      error: erro => {
        Swal.fire({
          title: "Ocorreu um erro ao exibir a lista de veterinário",
          icon: "error",
          confirmButtonText: "Ok"
        });
      }
    });
  }

  buscarConsultaMaisProxima(agendamentos: Agendamento[]): Agendamento | null {
    const agora = new Date();
    // Filtra agendamentos que são futuros
    const agendamentosFuturos = agendamentos.filter(agendamento => {
      const agendamentoData = typeof agendamento.data === 'string' ? new Date(agendamento.data) : agendamento.data;
      return agendamentoData > agora;
    });

    if (agendamentosFuturos.length === 0) {
      return null;
    }

    // Ordena os agendamentos futuros pela data
    agendamentosFuturos.sort((a, b) => {
      const dataA = typeof a.data === 'string' ? new Date(a.data) : a.data;
      const dataB = typeof b.data === 'string' ? new Date(b.data) : b.data;
      return dataA.getTime() - dataB.getTime();
    });

    //("Próximo agendamento:", agendamentosFuturos[0]);
    this.proxAgendamento = agendamentosFuturos;
    this.totalAgendamentos = agendamentosFuturos.length;
    return agendamentosFuturos[0];
  }


  getClosestDate(agendamento: Agendamento[]): Agendamento | null {
    const now = new Date();
    agendamento.sort((a, b) => Math.abs(a.data.getTime() - now.getTime()) - Math.abs(b.data.getTime() - now.getTime()));
    return agendamento.length > 0 ? agendamento[0] : null;
  }

  listAllVeterinarios(){
    console.log("list all veterinario esta funcionado");
    this.veterinarioService.listAll().subscribe({
        next: lista => {
            this.veterinarios = lista;
        },
        error: erro => {
            Swal.fire({
                title: "Ocorreu um erro ao exibir a lista de veterinário",
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
    });
}

listAllLogs() {
  this.logService.listAll().subscribe({
    next: (lista) => {
      console.log(lista);
      this.logs = lista; 
      this.filteredLogs = lista; 
      this.extractUniqueAcoes(); 
    },
    error: (erro) => {
      Swal.fire({
        title: 'Ocorreu um erro ao exibir a lista de logs',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  });
}

extractUniqueAcoes() {
  this.uniqueAcoes = [...new Set(this.logs.map(log => log.acao))]; // Extrai ações únicas
}

applyFilters() {
  this.filteredLogs = this.logs.filter(log => {
    const matchesTerm = log.descricao.toLowerCase().includes(this.searchTerm.toLowerCase());
    const matchesDate = this.searchDate ? new Date(log.timestamp).toLocaleDateString() === new Date(this.searchDate).toLocaleDateString() : true;
    const matchesAcao = this.selectedAcao ? log.acao === this.selectedAcao : true;

    return matchesTerm && matchesDate && matchesAcao; // Retorna true se todas as condições forem atendidas
  });
}


new(){
  //this.pacienteEdit = new Paciente(0,'', new Especie(0, ''), new Date(), new Raca(0, '', new Especie(0, '')), null);
  if(this.loginService.hasPermission("USER")){
  this.pacienteEdit = new Paciente(0,'', new Date(), new Raca(0,'',new Especie(0,'')), this.loginService.getUsuarioLogado());
  }else {
    this.pacienteEdit = new Paciente(0,'', new Date(), new Raca(0,'',new Especie(0,'')), null);
  }
  this.modalRef = this.modalService.open(this.modalPacienteDetalhe, {
    modalClass: 'CustomModal'
  });
}

edit(paciente: Paciente){
  this.pacienteEdit = Object.assign({}, paciente); //clonando pra evitar referência de objeto
  //this.pacienteEdit.raca.especie = paciente.raca.especie;
  this.pacienteEdit.raca = paciente.raca;
  this.modalRef = this.modalService.open(this.modalPacienteDetalhe, {
    modalClass: 'CustomModal'
  });
}


retornoDetalhe(paciente: Paciente){
  this.listAllPacientes();
  this.modalRef.close();
}

select(paciente: Paciente){
  this.retorno.emit(paciente);
}

delete(paciente: Paciente){
  Swal.fire({
    title: 'Tem certeza que deseja deletar este registro?',
    icon: 'warning',
    showConfirmButton: true,
    showDenyButton: true,
    confirmButtonText: 'Sim',
    cancelButtonText: 'Não',
  }).then((result) => {
    if (result.isConfirmed){
      this.pacienteService.delete(paciente.id).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: "success",
            confirmButtonText: "Ok"
          });
          this.pacientes = [];
          this.listAllPacientes();
        },
        error: erro => {
          Swal.fire({
            title: paciente.nome + " possuí agendamentos pendentes, não é possivel remover",
            icon: "error",
            confirmButtonText: "Ok"
          });
        }
      });
    }
  });
  }

}
