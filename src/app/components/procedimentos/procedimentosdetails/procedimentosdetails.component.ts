import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { Procedimento } from '../../../models/procedimento';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcedimentoService } from '../../../services/procedimento.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { TutoreslistComponent } from '../../tutores/tutoreslist/tutoreslist.component';
import { VeterinarioslistComponent } from '../../veterinarios/veterinarioslist/veterinarioslist.component';
import { Veterinario } from '../../../models/veterinario';

@Component({
  selector: 'app-procedimentosdetails',
  standalone: true,
  imports: [FormsModule, MdbModalModule, TutoreslistComponent, VeterinarioslistComponent],
  templateUrl: './procedimentosdetails.component.html',
  styleUrl: './procedimentosdetails.component.scss'
})

export class ProcedimentosdetailsComponent {
  @Input("procedimento") procedimento: Procedimento = new Procedimento(0,'', new Date(),'','',null);
  @Output("retorno") retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute);
  router2 = inject(Router);

  modalService = inject(MdbModalService);
  @ViewChild('modalVeterinarios') modalVeterinarios!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  procedimentoService = inject(ProcedimentoService);

  constructor(){
    let id = this.router.snapshot.params["id"];
    if(id > 0){
      this.findById(id);
    }else{
      if(this.procedimento.id > 0){
        this.findById(id);
      }
    }
  }

  findById(id: number){
    this.procedimentoService.findById(id).subscribe({
      next: retorno => {
        this.procedimento = retorno;
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
    if (this.procedimento.id > 0) {
      this.procedimentoService.update(this.procedimento, this.procedimento.id).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/procedimentos'], {
            state: { procedimentoNovo: this.procedimento },
          });
          this.retorno.emit(this.procedimento);
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
      this.procedimentoService.save(this.procedimento).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            confirmButtonColor: '#54B4D3',
            text: 'procedimento salvo com sucesso!',
            icon: 'success',
          });
          this.router2.navigate(['admin/procedimentos'], {
            state: { procedimentoNovo: this.procedimento },
          });
          this.retorno.emit(this.procedimento);
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

  retornoVeterinario(veterinario: Veterinario) {
    this.procedimento.veterinario = veterinario;
    this.modalRef.close();
  }

}
