import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Login } from '../../../auth/login';
import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  login: Login = new Login ();

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
      this.router.navigate(['admin/dashboard']);
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
}
