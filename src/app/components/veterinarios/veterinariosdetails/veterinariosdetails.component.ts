import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { Veterinario } from '../../../models/veterinario';
import { ActivatedRoute, Router } from '@angular/router';
import { VeterinarioService } from '../../../services/veterinario.service';
import Swal from 'sweetalert2';
import { EnderecoService } from '../../../services/endereco.service';
import { Endereco } from '../../../models/endereco';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-veterinariosdetails',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MdbModalModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepicker,
    MatCheckboxModule,
    MatSelectModule,
  ],
  templateUrl: './veterinariosdetails.component.html',
  styleUrls: ['./veterinariosdetails.component.scss'] 
})

export class VeterinariosdetailsComponent {
  @Input("veterinario") veterinario: Veterinario = new Veterinario(0, '', '', new Endereco(0,'','','','','','',''));
  @Output("retorno") retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute);
  router2 = inject(Router);

  veterinarioService = inject(VeterinarioService);
  enderecoService = inject(EnderecoService);
  
  constructor() {}
  
  findById(id: number) {
    console.log(id)
    this.veterinarioService.findById(id).subscribe({
      next: retorno => {
        this.veterinario = retorno;
      },
      error: erro => {
        Swal.fire({
          title: "Algo deu errado na busca de veterinário, tente novamente.",
          icon: "error",
          confirmButtonText: "Ok"
        });
      },
    });
  }

  save() {
    if (this.veterinario.id > 0) {
        console.log(this.veterinario);
        // Atualiza o endereço primeiro, se necessário
        this.enderecoService.update(this.veterinario.endereco, this.veterinario.endereco.id).subscribe({
            next: enderecoAtualizado => {
                // Após o endereço ser atualizado, atualiza o veterinário
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
                            title: 'Erro ao editar o cadastro do veterinário',
                            icon: 'error',
                            confirmButtonText: 'Ok',
                        });
                    },
                });
            },
            error: erro => {
                Swal.fire({
                    title: 'Erro ao atualizar o endereço',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                });
            },
        });
    } else {
        // Salva o endereço primeiro
        console.log(this.veterinario.endereco);
        this.enderecoService.save(this.veterinario.endereco).subscribe({
            next: (endereco: Endereco) => {
                // Atualiza o endereço do veterinário com o ID retornado
                this.veterinario.endereco.id = endereco.id;
                // Após o endereço ser salvo, salva o veterinário
                this.veterinarioService.save(this.veterinario).subscribe({
                    next: mensagem => {
                        Swal.fire({
                            title: mensagem,
                            confirmButtonColor: '#54B4D3',
                            text: 'Veterinário salvo com sucesso!',
                            icon: 'success',
                        });
                        this.router2.navigate(['admin/veterinarios'], {
                            state: { pacienteNovo: this.veterinario },
                        });
                        this.retorno.emit(this.veterinario);
                    },
                    error: erro => {
                        Swal.fire({
                            title: 'Erro ao salvar o veterinário',
                            icon: 'error',
                            confirmButtonText: 'Ok',
                        });
                    },
                });
            },
            error: erro => {
                Swal.fire({
                    title: 'Erro ao salvar o endereço',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                });
            },
        });
    }
}

  blur(event: any) {
    this.enderecoService.getCEP(this.veterinario.endereco.cep).subscribe({
      next: novocep => {
        console.log(novocep);
        this.veterinario.endereco.cep = novocep.cep;
        this.veterinario.endereco.logradouro = novocep.logradouro;
        this.veterinario.endereco.cidade = novocep.localidade;
        this.veterinario.endereco.bairro = novocep.bairro;
        this.veterinario.endereco.estado = novocep.uf;
        console.log(this.veterinario);
      },
      error: erro => {
        console.log(erro);
      },
    });
  }

  sair(event: any) {
    this.retorno.emit(null); // Envia o evento para fechar o modal
  }
}