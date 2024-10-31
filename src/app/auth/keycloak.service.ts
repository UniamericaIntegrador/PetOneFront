import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class KeycloakAuthService {
  constructor(private keycloakService: KeycloakService) {}

  // Inicializa o Keycloak
  async init(): Promise<void> {
    try {
      await this.keycloakService.init({
        config: {
          url: 'http://192.168.56.13:8080/auth',  // URL do seu servidor Keycloak
          realm: 'petone',                        // Nome do realm configurado no Keycloak
          clientId: 'frontend',                   // ID do cliente configurado no Keycloak para o frontend
        },
        initOptions: {
          onLoad: 'login-required',              // Redireciona o usuário para login se não autenticado
          checkLoginIframe: false,
        },
        enableBearerInterceptor: true,           // Inclui o token JWT automaticamente nas requisições HTTP
        bearerPrefix: 'Bearer',                  // Define o prefixo do token de autorização
      });
    } catch (error) {
      console.error('Erro ao inicializar o Keycloak', error);
    }
  }

  // Verifica se o usuário está autenticado
  async isLoggedIn(): Promise<boolean> {
    return await this.keycloakService.isLoggedIn();
  }

  // Realiza o login do usuário
  login(): void {
    this.keycloakService.login();
  }

  // Realiza o logout do usuário
  logout(): void {
    this.keycloakService.logout();
  }

  // Obtém o nome do usuário autenticado
  getUsername(): string | null {
    return this.keycloakService.getUsername();
  }

  // Obtém o token JWT atual do usuário
  async getToken(): Promise<string> {
    return await this.keycloakService.getToken();
  }
}
