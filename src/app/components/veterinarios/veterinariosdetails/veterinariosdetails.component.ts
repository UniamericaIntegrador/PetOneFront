import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { Veterinario } from '../../../models/veterinario';
import { ActivatedRoute, Router } from '@angular/router';
import { VeterinarioService } from '../../../services/veterinario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-veterinariosdetails',
  standalone: true,
  imports: [FormsModule, MdbModalModule],
  templateUrl: './veterinariosdetails.component.html',
  styleUrl: './veterinariosdetails.component.scss'
})

export class VeterinariosdetailsComponent {
  @Input("veterinario") veterinario: Veterinario = new Veterinario(0, '', '', '');
  @Output("retorno") retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute);
  router2 = inject(Router);

  veterinarioService = inject(VeterinarioService);

  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    } else {
      if (this.veterinario.id > 0) {
        this.findById(id);
      }
    }
  }

  findById(id: number) {
    this.veterinarioService.findById(id).subscribe({
      next: retorno => {
        this.veterinario = retorno;
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
    if (this.veterinario.id > 0) {
      this.veterinarioService.update(this.veterinario, this.veterinario.id).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/veterinarios'], {
            state: { veterinarioEditado: this.veterinario },
          });
          this.retorno.emit(this.veterinario);
        },
        error: erro => {
          Swal.fire({
            title: 'Erro ao editar o cadastro do veterinario',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    } else {
      this.veterinarioService.save(this.veterinario).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            confirmButtonColor: '#54B4D3',
            text: 'Veterinario salvo com sucesso!',
            icon: 'success',
          });
          this.router2.navigate(['admin/veterinarios'], {
            state: { pacienteNovo: this.veterinario },
          });
          this.retorno.emit(this.veterinario);
        },
        error: erro => {
          Swal.fire({
            title: 'Erro ao salvar o veterinario',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    }
  }
  
  cep: any;
  logradouro: any;
  localidade: any;
  bairro: any;
  uf: any;
  complemento: any;

  ngOnInit(): void { }

  buscaCEP() {
    this.veterinarioService.getCEP(this.cep).subscribe((data) => {
      this.cep = data.cep;
      this.logradouro = data.logradouro;
      this.localidade = data.localidade;
      this.bairro = data.bairro;
      this.uf = data.uf;
      console.log(this.bairro);
    });
  }
  blur(event: any) {
    this.buscaCEP();

    console.log(this.buscaCEP);
  }


}

