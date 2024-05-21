import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Procedimento } from '../../../models/procedimento';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcedimentoService } from '../../../services/procedimento.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-procedimentosdetails',
  standalone: true,
  imports: [FormsModule, MdbModalModule],
  templateUrl: './procedimentosdetails.component.html',
  styleUrl: './procedimentosdetails.component.scss'
})

export class ProcedimentosdetailsComponent {
  @Input("procedimento") procedimento: Procedimento = new Procedimento(0,'', new Date(),'','');
  @Output("retorno") retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute);
  router2 = inject(Router);

  procedimentoService = inject(ProcedimentoService);

  constructor(){
    let id = this.router.snapshot.params["id"];
    if(id > 0){
      this.findById(id);
    }
  }

  findById(id: number){
    this.procedimentoService.findById(id).subscribe({
      next: (procedimento) => {
        this.procedimento = procedimento;
      },
      error: (erro) => {
        alert(erro.status);
        console.log(erro);
        Swal.fire({
          title: "Algo deu errado na busca, tente novamente.",
          icon: "error",
          confirmButtonText: "Ok"
        });
      },
    });
  }

  save() {
    if (this.procedimento.id > 0) {
      this.procedimentoService.update(this.procedimento, this.procedimento.id).subscribe({
        next: (retorno) => {
          Swal.fire({
            title: 'Editado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/procedimentos'], {
            state: { procedimentoNovo: this.procedimento },
          });
          this.retorno.emit(this.procedimento);
        },
        error: (erro) => {
          alert(erro.status);
          console.log(erro);
          Swal.fire({
            title: 'Erro ao editar o cadastro de procedimento',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    } else {
      this.procedimentoService.save(this.procedimento).subscribe({
        next: (retorno) => {
          Swal.fire({
            title: 'Sucesso!',
            confirmButtonColor: '#54B4D3',
            text: 'procedimento salvo com sucesso!',
            icon: 'success',
          });
          this.router2.navigate(['admin/procedimentos'], {
            state: { procedimentoNovo: this.procedimento },
          });
          this.retorno.emit(this.procedimento);
        },
        error: (erro) => {
          alert(erro.status);
          console.log(erro);
          Swal.fire({
            title: 'Erro ao salvar o procedimento',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    }
  }

}
