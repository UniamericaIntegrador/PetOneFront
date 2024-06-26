import { Component, inject } from '@angular/core';
import { LoginService } from '../../../auth/login.service';
import { Usuario } from '../../../auth/usuario';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  loginService = inject(LoginService);
  usuario!: Usuario;

  constructor() {
    this.usuario = this.loginService.getUsuarioLogado();
  }
}
