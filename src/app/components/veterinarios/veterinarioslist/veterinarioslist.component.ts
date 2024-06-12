import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { VeterinariosdetailsComponent } from '../veterinariosdetails/veterinariosdetails.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MdbModalConfig, MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Veterinario } from '../../../models/veterinario';
import { VeterinarioService } from '../../../services/veterinario.service';
import Swal from 'sweetalert2';
import { Endereco } from '../../../models/endereco';

@Component({
  selector: 'app-veterinarioslist',
  standalone: true,
  imports: [FormsModule, RouterLink, MdbModalModule,VeterinariosdetailsComponent],
  templateUrl: './veterinarioslist.component.html',
  styleUrl: './veterinarioslist.component.scss'
})
export class VeterinarioslistComponent {
  lista: Veterinario[] = [];
  veterinarioEdit: Veterinario = new Veterinario(0,'','',new Endereco(0,'','','','','','',''));

  listaEndereco: Endereco[] = [];
  enderecoEdit: Endereco = new Endereco(0,'','','','','','','');

  @Input("esconderBotoes") esconderBotoes: boolean = false;
  @Output("retorno") retorno = new EventEmitter<any>();

  modalService = inject(MdbModalService);
  @ViewChild("modalVeterinarioDetalhe") modalVeterinarioDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  veterinarioService = inject(VeterinarioService);

  constructor(){
    this.listAll();

    let veterinarioNovo = history.state.veterinarioNovo;
    let veterinarioEditado = history.state.veterinarioEditado;

    let enderecoNovo = history.state.enderecoNovo;
    let endrecoEditado = history.state.endrecoEditado;

    if(veterinarioNovo != null){
      this.lista.push(veterinarioNovo);
    }

    if(enderecoNovo != null){
      this.listaEndereco.push(enderecoNovo);
    }

    if(veterinarioEditado != null){
      let indice = this.lista.findIndex((x) => {
        return x.id == veterinarioEditado.id;
      });
      this.lista[indice] = veterinarioEditado;
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
    this.veterinarioService.listAll().subscribe({
        next: lista => {
            this.lista = lista;
            console.log(lista);
        },
        error: erro => {
            Swal.fire({
                title: "Ocorreu um erro ao exibir a lista de veterinário",
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
    });
}

  delete(veterinario: Veterinario){
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed){
        this.veterinarioService.delete(veterinario.id).subscribe({
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
      this.veterinarioEdit = new Veterinario(0,'','',new Endereco(0,'','','','','','',''));
      this.modalRef = this.modalService.open(this.modalVeterinarioDetalhe, {
        modalClass: 'CustomModal'
      });
    }

    edit(veterinario: Veterinario){
      console.log(veterinario.id)
      console.log(veterinario.endereco.id)
      this.veterinarioEdit = Object.assign({}, veterinario);
      this.veterinarioEdit.endereco = veterinario.endereco; // Atribuição direta
      this.modalRef = this.modalService.open(this.modalVeterinarioDetalhe, {
        modalClass: 'CustomModal'
      });
    }
    

    retornoDetalhe(veterinario: Veterinario){
      console.log("retorno de detalhes")
      this.listAll();
      this.modalRef.close();
    }

    select(veterinario: Veterinario){
      this.retorno.emit(veterinario);
      console.log(veterinario.id)
      console.log("deveria ser o end")
    }

}