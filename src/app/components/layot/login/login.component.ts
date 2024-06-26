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
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  login: Login = new Login ();
  usuario: Usuario = new Usuario ();

  loginService = inject(LoginService);
  router = inject(Router);

  logar(){
    console.log(this.login);
    this.loginService.logar(this.login).subscribe({
      next: token => {
        console.log(token);
        this.loginService.addToken(token);
        this.router.navigate(['/admin/dashboard']);
      },
      error: erro => {
        Swal.fire({
          title: "Erro",
          confirmButtonColor: "",
          confirmButtonText: "Tentar novamente",
          text: "Login ou senha incorreta.",
          icon: "error"
        });
      }
    });
  }

  cadastrar(): void {
    this.loginService.cadastrar(this.usuario).subscribe({
      next: token => {
        console.log(token);
        this.loginService.addToken(token);
        this.router.navigate(['/admin/dashboard']);
      },
      error: (erro: any) => {
        Swal.fire({
          title: "Erro",
          confirmButtonColor: "",
          confirmButtonText: "Tentar novamente",
          text: "Erro ao cadastrar usuário.",
          icon: "error"
        });
      }
    });
  }

  modoLogin: boolean = true; // Variável para controlar o modo de exibição inicial (true para login, false para cadastro)

  toggleModo(): void {
    this.modoLogin = !this.modoLogin; // Alternar entre login e cadastro ao clicar no botão "Cadastre-se"
  }
  
}

