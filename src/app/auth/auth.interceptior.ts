import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { from, switchMap } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloak = inject(KeycloakService);

  if (keycloak && keycloak.isTokenExpired()) {
    return from(keycloak.updateToken(240)).pipe(
      switchMap(() => {
        const authReq = req.clone({
          headers: req.headers.set(
            'Authorization',
            `Bearer ${keycloak.getKeycloakInstance().token}`
          )
        });
        return next(authReq);
      })
    );
  }
  
  return next(req);
};