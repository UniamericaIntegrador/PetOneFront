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
  usuario!: Tutor;
  
  loginService = inject(LoginService);

  constructor() { 
    this.usuario = this.loginService.getUsuarioLogado();
  }
}
