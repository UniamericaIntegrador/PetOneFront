import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PacientesdetailsComponent } from '../pacientesdetails/pacientesdetails.component';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Paciente } from '../../../models/paciente';
import { PacienteService } from '../../../services/paciente.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { Especie } from '../../../models/especie';
import { Raca } from '../../../models/raca';

@Component({
  selector: 'app-pacienteslist',
  standalone: true,
  imports: [FormsModule, RouterLink, MdbModalModule, PacientesdetailsComponent],
  templateUrl: './pacienteslist.component.html',
  styleUrl: './pacienteslist.component.scss'
})
//
export class PacienteslistComponent {
  lista: Paciente[] = [];
  //pacienteEdit: Paciente =  new Paciente(0,'', new Especie(0, ''), new Date(), new Raca(0, '', new Especie(0, '')), null);
  pacienteEdit: Paciente =  new Paciente(0,'', '', new Date(), '', null);

  modalService = inject(MdbModalService);
  @ViewChild("modalPacienteDetalhe") modalPacienteDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  pacienteService = inject(PacienteService);

  constructor(){
    this.listAll();

    let pacienteNovo = history.state.pacienteNovo;
    let pacienteEditado = history.state.pacienteEditado;

    if(pacienteNovo != null){
      pacienteNovo.id = 555;
      this.lista.push(pacienteNovo);
    }

    if(pacienteEditado != null){
      let indice = this.lista.findIndex((x) => {
        return x.id == pacienteEditado.id;
      });
      this.lista[indice] = pacienteEditado;
    }
  }

  listAll(){
    this.pacienteService.listAll().subscribe({
      next: lista => {
        this.lista = lista;
        console.log(lista);
      },
      error: erro => {
        Swal.fire({
          title: "Ocorreu um erro ao exibir a lista de paciente",
          icon: "error",
          confirmButtonText: "Ok"
        });
      }
    });
  }

  delete(paciente: Paciente){
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed){
        this.pacienteService.delete(paciente.id).subscribe({
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
      //this.pacienteEdit = new Paciente(0,'', new Especie(0, ''), new Date(), new Raca(0, '', new Especie(0, '')), null);
      this.pacienteEdit = new Paciente(0,'', '', new Date(), '', null);
      this.modalRef = this.modalService.open(this.modalPacienteDetalhe, {
        modalClass: 'CustomModal'
      });
    }

    edit(paciente: Paciente){
      this.pacienteEdit = Object.assign({}, paciente); //clonando pra evitar referência de objeto
      this.modalRef = this.modalService.open(this.modalPacienteDetalhe, {
        modalClass: 'CustomModal'
      });
    }

    retornoDetalhe(paciente: Paciente){
      this.listAll();
      this.modalRef.close();
    }
  }


