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

  constructor() {
    this.loginService.removerToken();
  }

  logar(){
    this.loginService.logar(this.login).subscribe({
      next: token => {
        if (token) {
          this.loginService.addToken(token);
          if (this.loginService.hasPermission("ADMIN"))
            this.router.navigate(['/admin/dashboard']);
          else if (this.loginService.hasPermission("USER"))
            this.router.navigate(['/admin/pacientes']);
        } else {
          alert('Usuário ou senha incorretos!');
        }
      },
      error: erro => {
        alert('deu erro');
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

/*
  login!: string;
  senha!: string;

  router = inject(Router);

  logar(){
    if(this.login == "admin" && this.senha == "admin"){
      Swal.fire({
        position: "center",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['admin/pacientes']);
    }else{
      Swal.fire({
        title: "Erro",
        confirmButtonColor: "",
        confirmButtonText: "Tentar novamente",
        text: "Login ou senha incorreta.",
        icon: "error"
      });
    }
  }
*/