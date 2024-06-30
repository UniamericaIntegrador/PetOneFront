import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Especie } from '../../../models/especie';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../auth/login.service';
//import { Usuario } from '../../../auth/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { EspecieService } from '../../../services/especie.service';
import Swal from 'sweetalert2';
import { state } from '@angular/animations';
import { Tutor } from '../../../models/tutor';

@Component({
  selector: 'app-especiedetails',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatCheckboxModule, MatSelectModule, FormsModule],
  templateUrl: './especiedetails.component.html',
  styleUrl: './especiedetails.component.scss'
})
export class EspeciedetailsComponent {
  @Input("especie") especie: Especie = new Especie(0, '');
  @Output("retorno") retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute);
  voltar = inject(Router);

  especieService = inject(EspecieService);

  loginService = inject(LoginService);
  usuario!: Tutor;

  constructor() {

    this.usuario = this.loginService.getUsuarioLogado();

    let id = this.router.snapshot.params["id"];
    if (id > 0) {
      this.findbyId(id);
    } else {
      if (this.especie.id > 0) {
        this.findbyId(id);
      }
    }
  }

  findbyId(id: number) {
    this.especieService.findById(id).subscribe({
      next: resultado =>{
        this.especie = resultado;
      },
      error: erro =>{
        Swal.fire({
          title: "Algo deu errado na busca, tente novamente.",
          icon: "error",
          confirmButtonText: "Ok"
        });
      }
    })
  }

  save(){
    console.log(this.especie);
    if(this.especie.id > 0){
      this.especieService.update(this.especie, this.especie.id).subscribe({
        next: resultado => {
          Swal.fire({
            title: this.especie.nome + " foi atualizado!",
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.voltar.navigate(["admin/especies"],{
            state: { especieNova: this.especie }
          });
          this.retorno.emit(this.especie);
        },
        error: erro =>{
          Swal.fire({
            title: 'Erro ao editar o cadastro de procedimento',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      });
    }else{
    this.especieService.save(this.especie).subscribe({
      next: resultado => {
        Swal.fire({
          title: this.especie.nome + " foi adicionado!",
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.voltar.navigate(["admin/especies"],{
          state: { especieNova: this.especie }
        });
        this.retorno.emit(this.especie);
      },
      error: erro => {
        Swal.fire({
          title: "Algo deu errado ao salvar, tente novamente.",
          icon: "error",
          confirmButtonText: "Ok"
        });
      }
    });
   }
  }



}
