import { Component, EventEmitter, inject, Inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { LoginService } from '../../../auth/login.service';
import { Agendamento } from '../../../models/agendamento';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AgendamentoService } from '../../../services/agendamento.service';
import Swal from 'sweetalert2';
import { AgendamentodetailComponent } from '../agendamentodetail/agendamentodetail.component';
import { Veterinario } from '../../../models/veterinario';
import { Paciente } from '../../../models/paciente';
import { Procedimento } from '../../../models/procedimento';
import { Tutor } from '../../../models/tutor';
import { TutorService } from '../../../services/tutor.service';
import { tutorDTO } from '../../../DTO/tutorDTO';
import { PacienteService } from '../../../services/paciente.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-agendamentolist',
  standalone: true,
  imports: [AgendamentodetailComponent],
  templateUrl: './agendamentolist.component.html',
  styleUrl: './agendamentolist.component.scss'
})
export class AgendamentolistComponent {

  loginService = inject(LoginService);
  lista: Agendamento[] = [];
  listaPacientes: Paciente[ ] = [];
  //agendamentoEdit: Agendamento = new Agendamento(0, '', new Date(), '', '', new Veterinario(0, '', '', null, '', '', '','', ''), new Paciente(0, '', new Date(), null, null), new Procedimento(0, ''), new Tutor(0, '', '', 0, null, '', '', '',''));
  agendamentoEdit: Agendamento = new Agendamento();
  @Input("esconderBotoes") esconderBotoes: boolean = false;
  @Input("view") view: boolean = true;
  @Output("retorno") retorno = new EventEmitter<any>();
  
  
  modalService = inject(MdbModalService);
  @ViewChild("modalAgendamentoDetalhe") modalAgendamentoDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  agendamentoService = inject(AgendamentoService);
  pacienteService = inject(PacienteService);

  //usuario!: tutorDTO;

  constructor(){
    //this.usuario = this.loginService.getUsuarioLogado();
    
    this.listAll();
    this.loadPacientes();

    let agendamentoNovo = history.state.agendamentoNovo;
    let agendamentoEditado = history.state.agendamentoEditado;

    if(agendamentoNovo != null){
      this.lista.push(agendamentoNovo);
    }

    if(agendamentoEditado != null){
      let indice = this.lista.findIndex((x) => {
        return x.id == agendamentoEditado.id;
      });
      this.lista[indice] = agendamentoEditado;
    }
  }

  listAll() {
    this.pacienteService.findByTutor().subscribe({
      next: pacientes => {
        this.listaPacientes = pacientes;
        const agendamentos = pacientes.map(p =>
          this.agendamentoService.findByTutor(p.id)
        );
  
        forkJoin(agendamentos).subscribe({
          next: agendamentosPorPaciente => {
            agendamentosPorPaciente.forEach(_agendamento => {
              this.lista.push(..._agendamento);
            });
  
            this.loadPacientes();
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
    const pacienteRequests = this.lista.map(paciente =>
      this.pacienteService.findById(paciente.id_paciente)
    );
    forkJoin(pacienteRequests).subscribe({
      next: pacientesDetalhados => {
        this.lista.forEach((agendamento, index) => {
          agendamento.paciente = pacientesDetalhados[index];
        });
        console.log(this.lista);
        this.lista.forEach(p => {
          console.log(p.paciente);
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
  

  delete(agendamento: Agendamento){
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed){
        this.agendamentoService.delete(agendamento.id).subscribe({
          next: mensagem => {
            Swal.fire({
              title: mensagem,
              icon: "success",
              confirmButtonText: "Ok"
            });
            this.lista = [];
            this.listAll();
          },
          error: erro => {
            Swal.fire({
              title: "Occoreu um erro",
              icon: "error",
              confirmButtonText: "Ok"
            });
          }
        });
      }
    });
    }
    
    new(){
      this.agendamentoEdit = new Agendamento();
      this.modalRef = this.modalService.open(this.modalAgendamentoDetalhe, {
        modalClass: 'CustomModal'
      });
    }

    edit(agendamento: Agendamento){
      this.agendamentoEdit = Object.assign({}, agendamento); 
      this.modalRef = this.modalService.open(this.modalAgendamentoDetalhe, {
        modalClass: 'CustomModal'
      });
    }

    retornoDetalhe(agendamento: Agendamento){
      this.listAll();
      this.modalRef.close();
    }
    
    select(agendamento: Agendamento){
      this.retorno.emit(agendamento);
    }

}
