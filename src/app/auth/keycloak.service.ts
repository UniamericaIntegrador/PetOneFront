import { Injectable, inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private keycloak = inject(KeycloakService);
  private userProfile$ = new BehaviorSubject<any | null>(null);

  async login(username: string, password: string): Promise<boolean> {
    try {
      await this.keycloak.login({
        username,
        password
      });
      
      const profile = await this.keycloak.loadUserProfile();
      this.userProfile$.next(profile);
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  async logout() {
    try {
      await this.keycloak.logout(window.location.origin);
      this.userProfile$.next(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  getUserProfile(): Observable<any | null> {
    return this.userProfile$.asObservable();
  }

  public isAuthenticated(): Promise<boolean> {
    return Promise.resolve(this.keycloak.isLoggedIn());
  }
  

  getToken(): Promise<string> {
    return this.keycloak.getToken();
  }
}