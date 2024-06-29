import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { ProcedimentosdetailsComponent } from '../procedimentosdetails/procedimentosdetails.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Procedimento } from '../../../models/procedimento';
import { ProcedimentoService } from '../../../services/procedimento.service';
import Swal from 'sweetalert2';
import { LoginService } from '../../../auth/login.service';
import { Usuario } from '../../../auth/usuario';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-procedimentoslist',
  standalone: true,
  imports: [FormsModule, RouterLink, MdbModalModule, ProcedimentosdetailsComponent, MatFormField, MatInputModule],
  templateUrl: './procedimentoslist.component.html',
  styleUrl: './procedimentoslist.component.scss'
})

export class ProcedimentoslistComponent {
  lista: Procedimento[] = [];
  procedimentoEdit: Procedimento = new Procedimento(0,'',new Date(0),'', '', null);

  @Input("esconderBotoes") esconderBotoes: boolean = false;
  @Output("retorno") retorno = new EventEmitter<any>();
  
  modalService = inject(MdbModalService);
  @ViewChild("modalProcedimentoDetalhe") modalProcedimentoDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  procedimentoService = inject(ProcedimentoService);

  loginService = inject(LoginService);
  //usuario!: Usuario;

  constructor(){
    //this.usuario = this.loginService.getUsuarioLogado();
    
    this.listAll();

    let procedimentoNovo = history.state.procedimentoNovo;
    let procedimentoEditado = history.state.procedimentoEditado;

    if(procedimentoNovo != null){
      this.lista.push(procedimentoNovo);
    }

    if(procedimentoEditado != null){
      let indice = this.lista.findIndex((x) => {
        return x.id == procedimentoEditado.id;
      });
      this.lista[indice] = procedimentoEditado;
    }
  }

  listAll(){
    this.procedimentoService.listAll().subscribe({
      next: lista => {
        this.lista = lista;
      },
      error: erro => {
        Swal.fire({
          title: "Ocorreu um erro ao exibir a lista de procedimento",
          icon: "error",
          confirmButtonText: "Ok"
        });
      }
    });
  }

  delete(procedimento: Procedimento){
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed){
        this.procedimentoService.delete(procedimento.id).subscribe({
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
      this.procedimentoEdit = new Procedimento(0,'',new Date(0),'','', null);
      this.modalRef = this.modalService.open(this.modalProcedimentoDetalhe, {
        modalClass: 'CustomModal'
      });
    }

    edit(procedimento: Procedimento){
      this.procedimentoEdit = Object.assign({}, procedimento); 
      this.modalRef = this.modalService.open(this.modalProcedimentoDetalhe, {
        modalClass: 'CustomModal'
      });
    }

    retornoDetalhe(procedimento: Procedimento){
      this.listAll();
      this.modalRef.close();
    }

    select(procedimento: Procedimento){
      this.retorno.emit(procedimento);
    }

    busca: string = "";

    buscar(): void {
      if(this.busca == "" || this.busca == null){
        this.listAll();
      }else{
        this.procedimentoService.findByNome(this.busca).subscribe({
          next: resultado =>{
            this.lista = resultado;
          },
          error: () =>{
            console.log("Não foi encontrado!");
          }
        });
      }
    }

}
