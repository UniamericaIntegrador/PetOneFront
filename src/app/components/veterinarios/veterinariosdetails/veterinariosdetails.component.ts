import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { Veterinario } from '../../../models/veterinario';
import { ActivatedRoute, Router } from '@angular/router';
import { VeterinarioService } from '../../../services/veterinario.service';
import Swal from 'sweetalert2';
import { EnderecoService } from '../../../services/endereco.service';

@Component({
  selector: 'app-veterinariosdetails',
  standalone: true,
  imports: [FormsModule, MdbModalModule],
  templateUrl: './veterinariosdetails.component.html',
  styleUrls: ['./veterinariosdetails.component.scss'] 
})

export class VeterinariosdetailsComponent {
  @Input("veterinario") veterinario: Veterinario = new Veterinario(0, '', '', null);
  @Output("retorno") retorno = new EventEmitter<any>();

  constructor(
    private router: ActivatedRoute,
    private router2: Router,
    private veterinarioService: VeterinarioService,
    private enderecoService: EnderecoService // Corrigido para EnderecoService
  ) {}

  cep: any;
  logradouro: any;
  localidade: any;
  bairro: any;
  uf: any;
  complemento: any;

  ngOnInit() {
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

  blur(event: any) {
    this.enderecoService.getCEP(this.cep).subscribe({
      next: novocep => {
        console.log(novocep);
        this.cep = novocep.cep;
        this.logradouro = novocep.logradouro;
        this.localidade = novocep.cidade;
        this.bairro = novocep.bairro;
        this.uf = novocep.estado;
      },
      error: erro => {
        console.log(erro);
      },
    });
  }

  /*
  blur(event: any) {
    this.enderecoService.getCEP(this.veterinario.endereco.cep).subscribe({
      next: novocep => {
        console.log(novocep);
        this.veterinario.endereco.cep = novocep.cep;
        this.veterinario.endereco.logradouro = novocep.logradouro;
        this.veterinario.endereco.cidade = novocep.cidade;
        this.veterinario.endereco.bairro = novocep.bairro;
        this.veterinario.endereco.estado = novocep.estado;
        console.log(this.veterinario);
      },
      error: erro => {
        console.log(erro);
      },
    });
  }*/
}
