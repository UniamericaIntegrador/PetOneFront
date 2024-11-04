
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/keycloak.service';


@Component({
  selector: 'app-protected',
  template: `
    <div *ngIf="userProfile">
      <h2>Bem-vindo, {{ userProfile.firstName }}</h2>
      <button (click)="logout()">Logout</button>
    </div>
  `
})
export class  LoginComponent implements OnInit {
  userProfile: any | null = null;

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    try {
      this.userProfile = await this.authService.getUserProfile();
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    }
  }

  logout() {
    this.authService.logout();
  }
}
