import { Component, inject } from '@angular/core';
import { LoginService } from '../../../auth/login.service';
import { Tutor } from '../../../models/tutor';
import { TutorService } from '../../../services/tutor.service';
import { tutorDTO } from '../../../DTO/tutorDTO';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  loginService = inject(LoginService);
  tutorService = inject(TutorService);
  //usuario!: Usuario;
  user: string = "disabled";
  email: string = "disabled";
  tutor: tutorDTO = new tutorDTO();

  constructor() {
    //this.usuario = this.loginService.getUsuarioLogado();
    this.tutor.email = "disabled";
    this.tutor.nome = "disabled";
    this.loadUser();
  }

  loadUser() {
    this.tutorService.tutorLogado().subscribe({
      next: data => {
        this.tutor = data;
        console.log(this.tutor);
      },
      error: err => {
        console.error('Erro ao carregar o tutor:', err);
      }
    });
  }
  
}
