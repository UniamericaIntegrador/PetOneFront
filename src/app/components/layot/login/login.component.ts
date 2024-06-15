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
