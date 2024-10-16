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
import { EspecieService } from '../../../services/especie.service';
import { RacaService } from '../../../services/raca.service';
import { LoginService } from '../../../auth/login.service';
import { Agendamento } from '../../../models/agendamento';
import { TutorService } from '../../../services/tutor.service';
import { PacienteDTO } from '../../../DTO/pacienteDTO';

@Component({
  selector: 'app-pacientesdetails',
  standalone: true,
  imports: [FormsModule,
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

export class PacientesdetailsComponent {
  //@Input("paciente") paciente: Paciente = new Paciente(0,'', new Especie(0, ''), new Date(), new Raca(0, '', new Especie(0, '')), null);
  //@Input("paciente") paciente: Paciente = new Paciente(0,'', '', new Date(), '', null);
  @Input("paciente") paciente: Paciente = new Paciente(0, '', new Date(), new Raca(0, '', new Especie(0, '')), null);
  @Output("retorno") retorno = new EventEmitter<any>();

  loginService = inject(LoginService);
  tutorService = inject(TutorService);


  router = inject(ActivatedRoute);
  router2 = inject(Router);

  modalService = inject(MdbModalService);
  @ViewChild("modalTutores") modalTutores!: TemplateRef<any>;
  @ViewChild("modalProcedimentos") modalProcedimentos!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  pacienteService = inject(PacienteService);
  racaService = inject(RacaService);
  especieService = inject(EspecieService);
  Tutor!: Tutor;
  pacienteDTO: PacienteDTO = new PacienteDTO(0, '', new Date(), new Raca(0, '', new Especie(0, '')), new Tutor(0, '', '', 0, null, '', '', '', ''))
  startDate = new Date(2024, 6, 6);

  lista: string[] = [];
  listaDog: string[] = [];

  listaEspecie: Especie[] = [];


  //Gatos: boolean = false;
  //Cachorros: boolean = false;

  //Gatos: string = "Gato";
  //Cachorros: string = "Cachorro";



  constructor() {

    setTimeout(() => {
      console.log(this.paciente);

    }, 1000);

    this.carregarRacas();
    this.carregarRacasDog();
    this.carregarEspecie();



    /*
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    } else {
      if (this.paciente.id > 0) {
        this.findById(id);
      }
    }
    */
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
    if (this.paciente.id > 0) {
      this.pacienteToDTO(this.paciente);
      this.pacienteService.update(this.pacienteDTO, this.paciente.id).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['user/home'], {
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
      this.pacienteToDTO(this.paciente);
      this.pacienteService.save(this.pacienteDTO).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            confirmButtonColor: '#54B4D3',
            text: 'Paciente salvo com sucesso!',
            icon: 'success',
          });
          this.router2.navigate(['user/home'], {
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

  retornoProcedimento(agendamentos: Agendamento) {
    if (this.paciente.agendamentos == null)
      this.paciente.agendamentos = [];

    this.paciente.agendamentos.push(agendamentos);
    this.modalRef.close();
  }

  desvincularProcedimentoPaciente(agendamento: Agendamento) {
    let posicao = this.paciente.agendamentos.findIndex(x => { return x.id == agendamento.id });
    this.paciente.agendamentos.splice(posicao, 1);
  }

  pacienteToDTO(paciente: Paciente) {
    if (this.paciente.id > 0) {
      this.pacienteDTO.id = paciente.id;
      this.pacienteDTO.nome = paciente.nome;
      this.pacienteDTO.dataNascimento = paciente.dataNascimento;
      this.pacienteDTO.agendamentos = paciente.agendamentos;
      this.pacienteDTO.raca.nome = paciente.raca.nome;
      this.pacienteDTO.raca.especie.id = paciente.raca.especie.id;
      this.pacienteDTO.tutor.id = paciente.tutor.id;
    } else {
      this.pacienteDTO.nome = paciente.nome;
      this.pacienteDTO.dataNascimento = paciente.dataNascimento;
      this.pacienteDTO.agendamentos = paciente.agendamentos;
      this.pacienteDTO.raca.nome = paciente.raca.nome;
      this.pacienteDTO.raca.especie.id = paciente.raca.especie.id;
      this.pacienteDTO.tutor.id = paciente.tutor.id;
    }
    console.log(this.pacienteDTO);
  }


  carregarRacas() {
    this.racaService.getRacas().subscribe({
      next: data => {
        this.lista = data;
      },
      error: erro => {
        Swal.fire({
          title: "Ocorreu um erro ao exibir a lista de raças de gatos",
          icon: "error",
          confirmButtonText: "Ok"
        });
      }
    });
  }

  carregarRacasDog() {
    this.racaService.getRacasDog().subscribe({
      next: data => {
        this.listaDog = data;
      },
      error: erro => {
        Swal.fire({
          title: "Ocorreu um erro ao exibir a lista de raças de cachorros",
          icon: "error",
          confirmButtonText: "Ok"
        });
      }
    });
  }

  carregarEspecie() {
    this.especieService.listAll().subscribe({
      next: data => {
        this.listaEspecie = data;
      },
      error: erro => {
        Swal.fire({
          title: "Ocorreu um erro ao exibir a lista de espécies",
          icon: "error",
          confirmButtonText: "Ok"
        });
      }
    })
  }

  loadTutor() {
    this.tutorService.tutorLogado().subscribe({
      next: data => {
        this.Tutor.id = data.id;
        this.paciente.tutor = this.Tutor;
      }
    })
  }

  /*
  racaToEspecie(){
    this.paciente.especie.nome = this.paciente.raca.especie.nome;
    console.log(this.paciente);
  }
  */
}