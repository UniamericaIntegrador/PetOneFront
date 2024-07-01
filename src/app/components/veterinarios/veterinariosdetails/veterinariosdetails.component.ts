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
import { LoginService } from '../../../auth/login.service';

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
  @Input("veterinario") veterinario: Veterinario = new Veterinario(0, '', '', new Endereco(0,'','','','','','',''),'','','','','');
  @Output("retorno") retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute);
  router2 = inject(Router);

  veterinarioService = inject(VeterinarioService);
  enderecoService = inject(EnderecoService);
  loginService = inject(LoginService)

  senha!: string;
  senhaconfirma!: string;
  
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

  logar() {
    this.veterinarioService.logar(this.veterinario).subscribe({
      next: token => {
        if (token) {
          this.veterinarioService.addToken(token);
          if (this.loginService.hasPermission("USERVET")) {
            this.router2.navigate(['/admin/dashboard']);
          } 
        } else {
          Swal.fire({
            title: 'Usuário ou senha incorretos!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ok'
          });
        }
      },
      error: erro => {
        alert('Erro ao tentar fazer login');
      }
    });
  }


  cadastrar() {
    if(this.senha != this.senhaconfirma){
      Swal.fire({
        title: 'Senhas não conferem. Tente novamente',
        icon: 'warning',
        confirmButtonText: 'Ok',
      })
      return;
    }


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

      this.veterinario.password = this.senha;
      this.veterinarioService.cadastrar(this.veterinario).subscribe({
        next: token => {
          if (token) {
            Swal.fire({
              title: 'Cadastro realizado com sucesso!',
              text: 'Deseja permanecer logado?',
              icon: 'success',
              showCancelButton: true,
              confirmButtonText: 'Sim',
              cancelButtonText: 'Não'
            }).then((result) => {
              if(result.isConfirmed){
                this.veterinarioService.addToken(token);
                if(this.veterinarioService.hasPermission("ADMIN")){
                  this.router2.navigate(['/admin/dashboard']);
                }else if (this.veterinarioService.hasPermission("USERVET")){
                  this.router2.navigate(['/admin/veterinarios']);
                }
              }else{
                this.router2.navigate(['/login']);
              }
            });
          }else{
            alert('Erro ao tentar cadastrar 1');
          }
        },
        error: erro => {
          alert('Erro ao tentar cadastrar 2');
        }
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