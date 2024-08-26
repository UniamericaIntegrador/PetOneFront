import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { TutoreslistComponent } from '../../tutores/tutoreslist/tutoreslist.component';
import { VeterinarioslistComponent } from '../../veterinarios/veterinarioslist/veterinarioslist.component';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../../auth/login.service';
import { Procedimento } from '../../../models/procedimento';
import { ProcedimentoService } from '../../../services/procedimento.service';
import { Agendamento } from '../../../models/agendamento';
import { AgendamentoService } from '../../../services/agendamento.service';
import { Veterinario } from '../../../models/veterinario';
import { ProcedimentoslistComponent } from "../../procedimentos/procedimentoslist/procedimentoslist.component";
import { Paciente } from '../../../models/paciente';
import { PacienteslistComponent } from "../../pacientes/pacienteslist/pacienteslist.component";
import { TutorService } from '../../../services/tutor.service';
import { Tutor } from '../../../models/tutor';
import { AgendamentoDTO } from '../../../DTO/agendamentoDTO';

@Component({
  selector: 'app-agendamentodetail',
  standalone: true,
  imports: [FormsModule, MdbModalModule, TutoreslistComponent, VeterinarioslistComponent, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatCheckboxModule, MatSelectModule, ProcedimentoslistComponent, PacienteslistComponent],
  templateUrl: './agendamentodetail.component.html',
  styleUrl: './agendamentodetail.component.scss'
})
export class AgendamentodetailComponent {
  @Input("agendamento") agendamento: Agendamento = new Agendamento();
  @Output("retorno") retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute);
  router2 = inject(Router);

  loginService = inject(LoginService);
  //usuario!: Usuario;

  modalService = inject(MdbModalService);
  @ViewChild('modalVeterinarios') modalVeterinarios!: TemplateRef<any>;
  @ViewChild("modalProcedimentos") modalProcedimentos!: TemplateRef<any>;
  @ViewChild("modalPacientes") modalPacientes!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  tutorService = inject(TutorService);
  agendamentService = inject(AgendamentoService);
  //_procedimento: Procedimento = new Procedimento(0, '');
  //_veterinario: Veterinario = new Veterinario(0, '','',null ,'','','','', '');
  //_paciente: Paciente = new Paciente(0, '', new Date(), null, null);

  _procedimento!: Procedimento;
  _veterinario!: Veterinario;
  _paciente!: Paciente;
  _Agendamento!: AgendamentoDTO;
  startDate: Date = new Date();

  novadata!: Date;

  dateHold: Date = new Date();

  datePipe: DatePipe = new DatePipe('en-US');

  constructor() {
    //this.usuario = this.loginService.getUsuarioLogado();
    this._Agendamento = new AgendamentoDTO(0, '', new Date(), '', '', new Veterinario(0, '', '', null, '', '', '', '', ''), new Paciente(0, '', new Date(), null, null), new Procedimento(0, ''), new Tutor(0, '', '', 0, null, '', '', '', ''), 0, '');
    this.dateHold = this.agendamento.data;
    let id = this.router.snapshot.params["id"];
    if (id > 0) {
      this.findById(id);
    } else {
      if (this.agendamento.id > 0) {
        this.findById(id);
      }
    }
  }

  findById(id: number) {
    this.agendamentService.findById(id).subscribe({
      next: retorno => {
        this.agendamento = retorno;
      },
      error: erro => {
        Swal.fire({
          title: "Algo deu errado na busca, tente novamente.",
          icon: "error",
          confirmButtonText: "Ok"
        });
      },
    });
  }

  save() {
    this.gerarJson();
    if (this.agendamento.id > 0) {
      this.agendamentService.update(this._Agendamento, this.agendamento.id).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['user/agendamentos'], {
            state: { procedimentoNovo: this.agendamento },
          });
          this.retorno.emit(this.agendamento);
        },
        error: erro => {
          Swal.fire({
            title: 'Erro ao editar o cadastro de procedimento',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    } else {
      this.agendamentService.save(this._Agendamento).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            confirmButtonColor: '#54B4D3',
            text: 'procedimento salvo com sucesso!',
            icon: 'success',
          });
          this.router2.navigate(['user/agendamentos'], {
            state: { procedimentoNovo: this.agendamento },
          });
          this.retorno.emit(this.agendamento);
        },
        error: erro => {
          Swal.fire({
            title: 'Erro ao salvar o procedimento',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    }
  }

  buscarVeterinario() {
    this.modalRef = this.modalService.open(this.modalVeterinarios, { modalClass: 'modal-lg' });
  }

  buscarPaciente() {
    this.modalRef = this.modalService.open(this.modalPacientes, { modalClass: 'modal-lg' });
  }

  buscarProcedimento() {
    this.modalRef = this.modalService.open(this.modalProcedimentos, { modalClass: 'modal-lg' });
  }

  retornoProcedimento(procedimento: Procedimento) {
    if (this.agendamento.procedimento == null)
      this.agendamento.procedimento = procedimento;
    this.agendamento.nome = this.agendamento.procedimento.nomeProcedimento;
    if (this.agendamento.procedimento != procedimento) {
      this.agendamento.procedimento = procedimento;
      this.agendamento.nome = this.agendamento.procedimento.nomeProcedimento;
    }
    this.modalRef.close();
  }

  retornoPaciente(paciente: Paciente) {
    if (this.agendamento.paciente == null)
      this.agendamento.paciente = paciente;
    this.agendamento.paciente = paciente
    if (this.agendamento.paciente != paciente) {
      console.log("Não carregou!");
      this.agendamento.paciente = paciente;
    }
    this.modalRef.close();
  }

  retornoVeterinario(veterinario: Veterinario) {
    if (this.agendamento.veterinario == null)
      this.agendamento.veterinario = veterinario;
    console.log(this.agendamento.veterinario);
    this.modalRef.close();
  }

  /*
  onDateChange(date: Date) {
    if (date) {
      const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd'); // Format date if not null
      this.procedimento.data = formattedDate; // Assign formatted date to procedimento.data
    } else {
      this.procedimento.data = null; // Handle null case as needed
    }
  }
  */
  /*

  formatDate(date: Date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return [year, month, day].join('-');
}
  */

  formatDate(date: Date): Date {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return new Date(year, month, day);
  }

  gerarJson() {
    if (this.agendamento.id > 0) {
      this._Agendamento.id = this.agendamento.id;
      this._Agendamento.nome = this.agendamento.procedimento.nomeProcedimento;
      this._Agendamento.data = this.agendamento.data;
      this._Agendamento.diagnostico = this.agendamento.diagnostico;
      this._Agendamento.resultado = this.agendamento.resultado;
      this._Agendamento.paciente.id = this.agendamento.paciente.id;
      this._Agendamento.id_paciente = this.agendamento.paciente.id;
      this._Agendamento.paciente_nome = this.agendamento.paciente.nome;
      this._Agendamento.procedimento.id = this.agendamento.procedimento.id;
      this._Agendamento.veterinario.id = this.agendamento.veterinario.id;
    } else {
      this._Agendamento.nome = this.agendamento.procedimento.nomeProcedimento;
      this._Agendamento.data = this.agendamento.data;
      this._Agendamento.diagnostico = this.agendamento.diagnostico;
      this._Agendamento.resultado = this.agendamento.resultado;
      this._Agendamento.paciente.id = this.agendamento.paciente.id;
      this._Agendamento.id_paciente = this.agendamento.paciente.id;
      this._Agendamento.paciente_nome = this.agendamento.paciente.nome;
      this._Agendamento.procedimento.id = this.agendamento.procedimento.id;
      this._Agendamento.veterinario.id = this.agendamento.veterinario.id;
    }
    this.tutorService.tutorLogado().subscribe({
      next: data => {
        this._Agendamento.tutor.id = data.id;
      }
    });
    console.log(JSON.stringify(this._Agendamento));
  }
}

