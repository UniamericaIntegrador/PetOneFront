import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild, inject, input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Paciente } from '../../../models/paciente';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../../../services/paciente.service';
import Swal from 'sweetalert2';
import { Procedimento } from '../../../models/procedimento';
import { Tutor } from '../../../models/tutor';
import { TutoreslistComponent } from '../../tutores/tutoreslist/tutoreslist.component';
import { ProcedimentoslistComponent } from '../../procedimentos/procedimentoslist/procedimentoslist.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Especie } from '../../../models/especie';
import { Raca } from '../../../models/raca';

@Component({
  selector: 'app-pacientesdetails',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MdbModalModule,
    TutoreslistComponent,
    ProcedimentoslistComponent,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
  templateUrl: './pacientesdetails.component.html',
  styleUrl: './pacientesdetails.component.scss'
})
//new Especie(0, ''),
export class PacientesdetailsComponent {
  //@Input("paciente") paciente: Paciente = new Paciente(0,'', new Especie(0, ''), new Date(), new Raca(0, '', new Especie(0, '')), null);
  @Input("paciente") paciente: Paciente = new Paciente(0,'', '', new Date(), '', null);
  @Output("retorno") retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute);
  router2 = inject(Router);

  modalService = inject(MdbModalService);
  @ViewChild("modalTutores") modalTutores!: TemplateRef<any>;
  @ViewChild("modalProcedimentos") modalProcedimentos!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  pacienteService = inject(PacienteService);

  startDate = new Date(2024, 6, 6);

  lista: string[] = [];
  listaDog: string[] = [];

  Gatos: boolean = false;
  Cachorros: boolean = false;

  constructor() {
    this.carregarRacas();
    this.carregarRacasDog();
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    } else {
      if (this.paciente.id > 0) {
        this.findById(id);
      }
    }
  }

  findById(id: number) {
    this.pacienteService.findById(id).subscribe({
      next: retorno => {
        console.log('ENTROU');
        this.paciente = retorno;
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
    //this.racaToEspecie();
    if (this.paciente.id > 0) {

      this.pacienteService.update(this.paciente, this.paciente.id).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/pacientes'], {
            state: { pacienteEditado: this.paciente },
          });
          this.retorno.emit(this.paciente);
        },
        error: erro => {
          Swal.fire({
            title: 'Erro ao editar o cadastro do paciente',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    } else {
      this.pacienteService.save(this.paciente).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            confirmButtonColor: '#54B4D3',
            text: 'Paciente salvo com sucesso!',
            icon: 'success',
          });
          this.router2.navigate(['admin/pacientes'], {
            state: { pacienteNovo: this.paciente },
          });
          this.retorno.emit(this.paciente);
        },
        error: erro => {
          Swal.fire({
            title: 'Erro ao salvar o paciente',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    }
  }

  buscarTutor() {
    this.modalRef = this.modalService.open(this.modalTutores, { modalClass: 'modal-lg' });
  }

  buscarProcedimentos() {
    this.modalRef = this.modalService.open(this.modalProcedimentos, { modalClass: 'modal-lg' });
  }

  retornoTutor(tutor: Tutor) {
    this.paciente.tutor = tutor;
    this.modalRef.close();
  }

  retornoProcedimento(procedimento: Procedimento) {
    if (this.paciente.procedimentos == null)
      this.paciente.procedimentos = [];

    this.paciente.procedimentos.push(procedimento);
    this.modalRef.close();
  }

  desvincularProcedimentoPaciente(procedimento: Procedimento) {
    let posicao = this.paciente.procedimentos.findIndex(x => { return x.id == procedimento.id });
    this.paciente.procedimentos.splice(posicao, 1);
  }


  carregarRacas() {
    this.pacienteService.getRacas().subscribe({
      next: data => {
        this.lista = data;
      },
      error: erro => {
        Swal.fire({
          title: "Ocorreu um erro ao exibir a lista de raças",
          icon: "error",
          confirmButtonText: "Ok"
        });
      }
    });
  }

  carregarRacasDog() {
    this.pacienteService.getRacasDog().subscribe({
      next: data => {
        this.listaDog = data;
      },
      error: erro => {
        Swal.fire({
          title: "Ocorreu um erro ao exibir a lista de raças",
          icon: "error",
          confirmButtonText: "Ok"
        });
      }
    });
  }
  /*
  racaToEspecie(){
    this.paciente.especie.nome = this.paciente.raca.especie.nome;
    console.log(this.paciente);
  }
  */
}