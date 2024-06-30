import { Component, EventEmitter, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { LoginService } from '../../../auth/login.service';
import { Especie } from '../../../models/especie';
import { EspeciedetailsComponent } from '../especiedetails/especiedetails.component';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { EspecieService } from '../../../services/especie.service';
import Swal from 'sweetalert2';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-especielist',
  standalone: true,
  imports: [EspeciedetailsComponent, MdbModalModule, MatFormFieldModule, MatFormField, MatInputModule, FormsModule],
  templateUrl: './especielist.component.html',
  styleUrl: './especielist.component.scss'
})
export class EspecielistComponent {

  @Output("retorno") retorno = new EventEmitter<any>();

  lista: Especie[] = [];

  EspecieEdit: Especie = new Especie(0, "");

  modalService = inject(MdbModalService);
  @ViewChild("modalEspeciedetalhe") modalEspeciedetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  especieService = inject(EspecieService);
  loginService = inject(LoginService);
  //usuario!: Usuario;
  busca: string = "";

  constructor() {
    //his.usuario = this.loginService.getUsuarioLogado();

    this.listAll();

    let especieNova = history.state.procedimentoNovo;
    let especieEditada = history.state.procedimentoEditado;

    if (especieNova != null) {
      this.lista.push(especieNova);
    }

    if (especieEditada != null) {
      let indice = this.lista.findIndex((x) => {
        return x.id == especieEditada.id;
      });
      this.lista[indice] = especieEditada;
    }
  }

  listAll() {
    this.especieService.listAll().subscribe({
      next: lista => {
        this.lista = lista;
      },
      error: erro => {
        Swal.fire({
          title: "Ocorreu um erro ao exibir a lista de especies",
          icon: "error",
          confirmButtonText: "Ok"
        });
      }
    });
  }

  new() {
    this.EspecieEdit = new Especie(0, "");
    this.modalRef = this.modalService.open(this.modalEspeciedetalhe, {
      modalClass: 'CustomModal'
    });
  }

  edit(especie: Especie) {
    this.EspecieEdit = Object.assign({}, especie);
    this.modalRef = this.modalService.open(this.modalEspeciedetalhe, {
      modalClass: 'CustomModal'
    });
  }

  delete(especie: Especie) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.especieService.delete(especie.id).subscribe({
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

  select(especie: Especie) {
    this.retorno.emit(especie);
  }

  retornoDetalhe(especie: Especie) {
    this.listAll();
    this.modalRef.close();
  }

  buscar(): void {
    if(this.busca == "" || this.busca == null){
      this.listAll();
    }else{
      this.especieService.findByNome(this.busca).subscribe({
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
