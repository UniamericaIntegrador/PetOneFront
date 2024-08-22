import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { TutoresdetailsComponent } from '../tutoresdetails/tutoresdetails.component';
import { Tutor } from '../../../models/tutor';
import { TutorService } from '../../../services/tutor.service';
import Swal from 'sweetalert2';
import { Endereco } from '../../../models/endereco';
import { LoginService } from '../../../auth/login.service';
import { Usuario } from '../../../auth/usuario';
import { MatFormField } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-tutoreslist',
  standalone: true,
  imports: [FormsModule, RouterLink, MdbModalModule, TutoresdetailsComponent, MatFormField, MatInputModule],
  templateUrl: './tutoreslist.component.html',
  styleUrls: ['./tutoreslist.component.scss']
})
export class TutoreslistComponent {
  lista: Tutor[] = [];
  tutorEdit: Tutor = new Tutor(0, '', '', 0, new Endereco(0, '', '', '', '', '', '', ''), '', '', '', '');
  listaEndereco: Endereco[] = [];
  enderecoEdit: Endereco = new Endereco(0, '', '', '', '', '', '', '');

  @Input("esconderBotoes") esconderBotoes: boolean = false;
  @Output("retorno") retorno = new EventEmitter<any>();

  modalService = inject(MdbModalService);
  @ViewChild("modalTutorDetalhe") modalTutorDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  tutorService = inject(TutorService);
  loginService = inject(LoginService);

  tutor!: Tutor; // Atribua o Tutor logado

  constructor() {
    this.tutor = this.loginService.getUsuarioLogado(); // Obtenha o usuário logado

    if (this.loginService.hasPermission("USER")) {
      // Se for um "USER", filtre a lista para mostrar apenas o tutor logado
      this.tutorService.findById(this.tutor.id).subscribe({
        next: tutorLogado => {
          this.lista = [tutorLogado];
        },
        error: erro => {
          Swal.fire({
            title: "Ocorreu um erro ao exibir os dados do tutor",
            icon: "error",
            confirmButtonText: "Ok"
          });
        }
      });
    } else {
      this.listAll();
    }

    let tutorNovo = history.state.tutorNovo;
    let tutorEditado = history.state.tutorEditado;

    let enderecoNovo = history.state.enderecoNovo;
    let endrecoEditado = history.state.endrecoEditado;

    if (tutorNovo != null) {
      this.lista.push(tutorNovo);
    }

    if (enderecoNovo != null) {
      this.listaEndereco.push(enderecoNovo);
    }

    if (tutorEditado != null) {
      let indice = this.lista.findIndex((x) => x.id == tutorEditado.id);
      this.lista[indice] = tutorEditado;
    }

    if (endrecoEditado != null) {
      let indice = this.listaEndereco.findIndex((x) => x.id == endrecoEditado.id);
      this.listaEndereco[indice] = endrecoEditado;
    }
  }

  listAll() {
    console.log("list all está funcionando");

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

  delete(tutor: Tutor) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
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
              title: "Ocorreu um erro",
              icon: "error",
              confirmButtonText: "Ok"
            });
          }
        });
      }
    });
  }

  new() {
    if (this.loginService.hasPermission("USER")) {
      Swal.fire({
        title: 'Você não tem permissão para criar um novo tutor!',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }

    this.tutorEdit = new Tutor(0, '', '', 0, new Endereco(0, '', '', '', '', '', '', ''), '', '', '', '');
    this.modalRef = this.modalService.open(this.modalTutorDetalhe, {
      modalClass: 'CustomModal'
    });
  }

  edit(tutor: Tutor) {
    console.log('ID do Tutor:', tutor.id); // Logar o ID do Tutor
    console.log('ID do Endereco do Tutor:', tutor.endereco.id); // Logar o ID do Endereco
    console.log('Usuário Logado:', this.tutor); // Logar o Tutor Logado
    console.log('ID do Usuário Logado:', this.tutor.id); // Logar o ID do Usuário Logado

    // Se o usuário logado for um "USER", carregue os dados do próprio tutor logado
    if (this.loginService.hasPermission("USER") && this.tutor.id === tutor.id) {
      this.tutorService.findById(this.tutor.id).subscribe({
        next: tutorLogado => {
          this.tutorEdit = Object.assign({}, tutorLogado);
          this.tutorEdit.endereco = tutorLogado.endereco; // Atribuição direta
          this.modalRef = this.modalService.open(this.modalTutorDetalhe, {
            modalClass: 'CustomModal'
          });
        },
        error: erro => {
          Swal.fire({
            title: "Ocorreu um erro ao carregar os dados do tutor",
            icon: "error",
            confirmButtonText: "Ok"
          });
        }
      });
    } else {
      // Se for um "ADMIN", permite a edição de qualquer tutor
      this.tutorEdit = Object.assign({}, tutor);
      this.tutorEdit.endereco = tutor.endereco; // Atribuição direta
      this.modalRef = this.modalService.open(this.modalTutorDetalhe, {
        modalClass: 'CustomModal'
      });
    }
  }

  retornoDetalhe(tutor: Tutor) {
    this.listAll();
    this.modalRef.close();
  }

  select(tutor: Tutor) {
    console.log('ID do Tutor:', tutor.id); // Logar o ID do Tutor
    console.log('ID do Endereco do Tutor:', tutor.endereco.id); // Logar o ID do Endereco
    console.log('Usuário Logado:', this.tutor); // Logar o Tutor Logado
    console.log('ID do Usuário Logado:', this.tutor.id);

    // Se o usuário logado for um "USER" e o tutor selecionado for diferente do tutor logado, não permite a seleção
    if (this.loginService.hasPermission("USER") && this.tutor.id !== tutor.id) {
      Swal.fire({
        title: 'Você não tem permissão para selecionar este tutor!',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }
    busca: string = "";

    buscar(): void {
      if(this.busca == "" || this.busca == null){
        this.listAll();
      }else{
        this.tutorService.findByNome(this.busca).subscribe({
          next: resultado =>{
            this.lista = resultado;
          },
          error: () =>{
            console.log("Não foi encontrado!");
          }
        });
      }
    }

    this.retorno.emit(tutor);
  }
}