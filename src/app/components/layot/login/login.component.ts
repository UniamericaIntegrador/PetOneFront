import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
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
}
