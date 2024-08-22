import { Component, inject } from '@angular/core';
import { LoginService } from '../../../auth/login.service';
import { Tutor } from '../../../models/tutor';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  loginService = inject(LoginService);
  //usuario!: Usuario;
  tutor!: Tutor;

  constructor() {
    //this.usuario = this.loginService.getUsuarioLogado();
    this.tutor = this.loginService.getUsuarioLogado();
  }
}
