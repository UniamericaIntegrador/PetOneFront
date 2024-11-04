import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

export const AuthGuard: CanActivateFn = async (route, state) => {
  const keycloak = inject(KeycloakService);
  const router = inject(Router);

  try {
    const authenticated = await keycloak.isLoggedIn();
    
    if (authenticated) {
      const requiredRoles = route.data['roles'];
      
      if (!requiredRoles || requiredRoles.length === 0) {
        return true;
      }

      return requiredRoles.every((role: string) => 
        keycloak.isUserInRole(role)
      );
    }
    
    await keycloak.login({
      redirectUri: window.location.origin + state.url
    });
    
    return false;
  } catch (error) {
    console.error('Auth Guard Error:', error);
    return false;
  }
};
