import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { Tutor } from '../../../models/tutor';
import { ActivatedRoute, Router } from '@angular/router';
import { TutorService } from '../../../services/tutor.service';
import Swal from 'sweetalert2';
import { Endereco } from '../../../models/endereco';
import { EnderecoService } from '../../../services/endereco.service';

@Component({
  selector: 'app-tutoresdetails',
  standalone: true,
  imports: [FormsModule, MdbModalModule],
  templateUrl: './tutoresdetails.component.html',
  styleUrl: './tutoresdetails.component.scss'
})
export class TutoresdetailsComponent {
  @Input("tutor") tutor: Tutor = new Tutor(0, '', '', 0, null);
  @Output("retorno") retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute);
  router2 = inject(Router);

  tutorService = inject(TutorService);
  enderecoService = inject(EnderecoService);

  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    } else {
      if (this.tutor.id > 0) {
        this.findById(id);
      }
    }
  }

  cep: any;
  logradouro: any;
  localidade: any;
  bairro: any;
  uf: any;
  complemento: any;

  findById(id: number) {
    this.tutorService.findById(id).subscribe({
      next: retorno => {
        this.tutor = retorno;
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
    if (this.tutor.id > 0) {
      this.tutorService.update(this.tutor, this.tutor.id).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/tutores'], {
            state: { tutorNovo: this.tutor },
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
    } else {
      this.tutorService.save(this.tutor).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            confirmButtonColor: '#54B4D3',
            text: 'Tutor salvo com sucesso!',
            icon: 'success',
          });
          this.router2.navigate(['admin/tutores'], {
            state: { tutorNovo: this.tutor },
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
    }
  }

  blur(event: any) {
    this.enderecoService.getCEP(this.cep).subscribe({
      next: novocep => {
        console.log(novocep);
        this.cep = novocep.cep;
        this.logradouro = novocep.logradouro;
        this.localidade = novocep.localidade;
        this.bairro = novocep.bairro;
        this.uf = novocep.uf;
      },
      error: erro => {
        console.log(erro);
      },
    });
  }
}
