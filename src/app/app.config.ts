import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { AuthInterceptor } from './auth/auth.interceptior';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'https://192.168.56.13:8443',  // Sem /auth para versões mais recentes
        realm: 'petone',
        clientId: 'petone'
      },
      initOptions: {
        onLoad: 'check-sso', // Mudamos para check-sso para usar nossa própria página de login
        checkLoginIframe: false,
        pkceMethod: 'S256'
      }
    });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    importProvidersFrom(KeycloakAngularModule),
    {
      provide: KeycloakService,
      useClass: KeycloakService
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ]
};
