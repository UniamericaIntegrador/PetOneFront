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
import { EspecieService } from '../../../services/especie.service';
import { RacaService } from '../../../services/raca.service';
import { LoginService } from '../../../auth/login.service';
import { Usuario } from '../../../auth/usuario';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-pacienteslist',
  standalone: true,
  imports: [FormsModule, RouterLink, MdbModalModule, PacientesdetailsComponent, MatFormFieldModule, MatFormField, MatInputModule, FormsModule],
  templateUrl: './pacienteslist.component.html',
  styleUrl: './pacienteslist.component.scss'
})
//
export class PacienteslistComponent {
  lista: Paciente[] = [];
  pacienteEdit: Paciente = new Paciente(0,'', new Date(), new Raca(0,'',new Especie(0,'')),null);

  listaEspecie: Especie[] = [];
  listaRaca: Raca [] = [];

  modalService = inject(MdbModalService);
  @ViewChild("modalPacienteDetalhe") modalPacienteDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  pacienteService = inject(PacienteService);
  especieService = inject(EspecieService);
  racaService = inject(RacaService);

  loginService = inject(LoginService);
  busca: string = "";
  //usuario!: Usuario;

  constructor(){
    //this.usuario = this.loginService.getUsuarioLogado();
    this.listAll();
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
      this.pacienteEdit = new Paciente(0,'', new Date(), new Raca(0,'',new Especie(0,'')),null);
      this.modalRef = this.modalService.open(this.modalPacienteDetalhe, {
        modalClass: 'CustomModal'
      });
    }

    edit(paciente: Paciente){
      this.pacienteEdit = Object.assign({}, paciente); //clonando pra evitar referência de objeto
      //this.pacienteEdit.raca.especie = paciente.raca.especie;
      this.pacienteEdit.raca = paciente.raca;
      this.modalRef = this.modalService.open(this.modalPacienteDetalhe, {
        modalClass: 'CustomModal'
      });
    }


    retornoDetalhe(paciente: Paciente){
      this.listAll();
      this.modalRef.close();
    }

    buscar(): void {
      if(this.busca == "" || this.busca == null){
        this.listAll();
      }else{
        this.pacienteService.findByNome(this.busca).subscribe({
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