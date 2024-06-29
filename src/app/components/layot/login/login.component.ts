import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Login } from '../../../auth/login';
import { Usuario } from '../../../auth/usuario';
import { LoginService } from '../../../auth/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  login: Login = new Login();
  usuario: Usuario = new Usuario();
  senha!: string;
  senhaconfirma!: string;

  loginService = inject(LoginService);
  router = inject(Router);

  modoLogin: boolean = true; // Variável para controlar o modo de exibição inicial (true para login, false para cadastro)

  constructor() {
    this.loginService.removerToken();
  }

  logar() {
    this.loginService.logar(this.login).subscribe({
      next: token => {
        if (token) {
          this.loginService.addToken(token);
          if (this.loginService.hasPermission("ADMIN"))
            this.router.navigate(['/admin/dashboard']);
          else if (this.loginService.hasPermission("USER"))
            this.router.navigate(['/admin/dashboard']);
        } else {
          alert('Usuário ou senha incorretos!');
        }
      },
      error: erro => {
        alert('Erro ao tentar fazer login');
      }
    });
  }

  cadastrar(): void {
    if(this.senha != this.senhaconfirma){
      Swal.fire({
        title: 'Senhas não conferem. Tente novamente',
        icon: 'warning',
        confirmButtonText: 'Ok',
      })
      return;
    }
    this.usuario.password = this.senha;
    this.loginService.cadastrar(this.usuario).subscribe({
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
            if (result.isConfirmed) {
              this.loginService.addToken(token);
              if (this.loginService.hasPermission("ADMIN")) {
                this.router.navigate(['/admin/dashboard']);
              } else if (this.loginService.hasPermission("USER")) {
                this.router.navigate(['/admin/dashboard']);
              }
            } else {
              this.router.navigate(['/login']);
            }
          });
        } else {
          alert('Erro ao tentar cadastrar 1');
        }
      },
      error: erro => {
        alert('Erro ao tentar cadastrar 2');
      }
    });
  }

  toggleModo(): void {
    this.modoLogin = !this.modoLogin; // Alternar entre login e cadastro ao clicar no botão "Cadastre-se"
  }
}
