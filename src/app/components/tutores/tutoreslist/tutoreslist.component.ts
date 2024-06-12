import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { TutoresdetailsComponent } from '../tutoresdetails/tutoresdetails.component';
import { Tutor } from '../../../models/tutor';
import { TutorService } from '../../../services/tutor.service';
import Swal from 'sweetalert2';
import { Endereco } from '../../../models/endereco';

@Component({
  selector: 'app-tutoreslist',
  standalone: true,
  imports: [FormsModule, RouterLink, MdbModalModule, TutoresdetailsComponent],
  templateUrl: './tutoreslist.component.html',
  styleUrl: './tutoreslist.component.scss'
})
export class TutoreslistComponent {
  lista: Tutor[] = [];
  tutorEdit: Tutor = new Tutor(0,'','',0,new Endereco(0,'','','','','','',''));

  listaEndereco: Endereco[] = [];
  enderecoEdit: Endereco = new Endereco(0,'','','','','','','');

  @Input("esconderBotoes") esconderBotoes: boolean = false;
  @Output("retorno") retorno = new EventEmitter<any>();

  modalService = inject(MdbModalService);
  @ViewChild("modalTutorDetalhe") modalTutorDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  tutorService = inject(TutorService);

  constructor(){
    this.listAll();

    let tutorNovo = history.state.tutorNovo;
    let tutorEditado = history.state.tutorEditado;

    let enderecoNovo = history.state.enderecoNovo;
    let endrecoEditado = history.state.endrecoEditado;

    if(tutorNovo != null){
      this.lista.push(tutorNovo);
    }

    if(enderecoNovo != null){
      this.listaEndereco.push(enderecoNovo);
    }

    if(tutorEditado != null){
      let indice = this.lista.findIndex((x) => {
        return x.id == tutorEditado.id;
      });
      this.lista[indice] = tutorEditado;
    }

    if(endrecoEditado != null){
      let indice = this.listaEndereco.findIndex((x) => {
        return x.id == endrecoEditado.id;
      });
      this.listaEndereco[indice] = endrecoEditado;
    }
  }

  listAll(){
    console.log("list all esta funcionado");
    this.tutorService.listAll().subscribe({
        next: lista => {
            this.lista = lista;
            console.log(lista);
        },
        error: erro => {
            Swal.fire({
                title: "Ocorreu um erro ao exibir a lista de tutor",
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
    });
  }

  delete(tutor: Tutor){
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed){
        this.tutorService.delete(tutor.id).subscribe({
          next: mensagem => {
            Swal.fire({
              title: mensagem,
              icon: "success",
              confirmButtonText: "Ok"
            });
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
      this.tutorEdit = new Tutor(0,'','',0,new Endereco(0,'','','','','','',''));
      this.modalRef = this.modalService.open(this.modalTutorDetalhe, {
        modalClass: 'CustomModal'
      });
    }

    edit(tutor: Tutor){
      console.log(tutor.id)
      console.log(tutor.endereco.id)
      this.tutorEdit = Object.assign({}, tutor);
      this.tutorEdit.endereco = tutor.endereco; // Atribuição direta
      this.modalRef = this.modalService.open(this.modalTutorDetalhe, {
        modalClass: 'CustomModal'
      });
    }

    retornoDetalhe(tutor: Tutor){
      this.listAll();
      this.modalRef.close();
    }

    select(tutor: Tutor){
      this.retorno.emit(tutor);
    }
}