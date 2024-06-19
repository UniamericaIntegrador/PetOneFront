import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { Tutor } from '../../../models/tutor';
import { ActivatedRoute, Router } from '@angular/router';
import { TutorService } from '../../../services/tutor.service';
import Swal from 'sweetalert2';
import { Endereco } from '../../../models/endereco';
import { EnderecoService } from '../../../services/endereco.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-tutoresdetails',
  standalone: true,
  imports: [FormsModule, MdbModalModule, FormsModule,
    ReactiveFormsModule,
    MdbModalModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepicker,
    MatCheckboxModule,
    MatSelectModule,],
  templateUrl: './tutoresdetails.component.html',
  styleUrl: './tutoresdetails.component.scss'
})

export class TutoresdetailsComponent {
  @Input("tutor") tutor: Tutor = new Tutor(0, '', '', 0, new Endereco(0,'','','','','','',''));
  @Output("retorno") retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute);
  router2 = inject(Router);

  tutorService = inject(TutorService);
  enderecoService = inject(EnderecoService);

  constructor() {}

  findById(id: number) {
    this.tutorService.findById(id).subscribe({
      next: retorno => {
        this.tutor = retorno;
      },
      error: erro => {
        Swal.fire({
          title: "Algo deu errado na busca de tutor, tente novamente.",
          icon: "error",
          confirmButtonText: "Ok"
        });
      },
    });
  }

  save() {
    if (this.tutor.id > 0) {
        this.enderecoService.update(this.tutor.endereco, this.tutor.endereco.id).subscribe({
            next: enderecoAtualizado => {
                this.tutorService.update(this.tutor, this.tutor.id).subscribe({
                    next: mensagem => {
                        Swal.fire({
                            title: mensagem,
                            icon: 'success',
                            confirmButtonText: 'Ok',
                        });
                        this.router2.navigate(['admin/tutores'], {
                            state: { tutorEditado: this.tutor },
                        });
                        this.retorno.emit(this.tutor);
                    },
                    error: erro => {
                        Swal.fire({
                            title: 'Erro ao editar o cadastro do tutor',
                            icon: 'error',
                            confirmButtonText: 'Ok',
                        });
                    },
                });
            },
            error: erro => {
                Swal.fire({
                    title: 'Erro ao atualizar o endereço',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                });
            },
        });
    } else {
        this.enderecoService.save(this.tutor.endereco).subscribe({
            next: (endereco: Endereco) => {
                this.tutor.endereco.id = endereco.id;
                this.tutorService.save(this.tutor).subscribe({
                    next: mensagem => {
                        Swal.fire({
                            title: mensagem,
                            confirmButtonColor: '#54B4D3',
                            text: 'Tutor salvo com sucesso!',
                            icon: 'success',
                        });
                        this.router2.navigate(['admin/tutores'], {
                            state: { pacienteNovo: this.tutor },
                        });
                        this.retorno.emit(this.tutor);
                    },
                    error: erro => {
                        Swal.fire({
                            title: 'Erro ao salvar o tutor',
                            icon: 'error',
                            confirmButtonText: 'Ok',
                        });
                    },
                });
            },
            error: erro => {
                Swal.fire({
                    title: 'Erro ao salvar o endereço',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                });
            },
        });
    }
}

  blur(event: any) {
    this.enderecoService.getCEP(this.tutor.endereco.cep).subscribe({
      next: novocep => {
        console.log(novocep);
        this.tutor.endereco.cep = novocep.cep;
        this.tutor.endereco.logradouro = novocep.logradouro;
        this.tutor.endereco.cidade = novocep.localidade;
        this.tutor.endereco.bairro = novocep.bairro;
        this.tutor.endereco.estado = novocep.uf;
        console.log(this.tutor);
      },
      error: erro => {
        console.log(erro);
      },
    });
  }

  calcularIdade(date: Date){
    var idade = Date.now() - date.getTime();
    return idade;
  }
}
