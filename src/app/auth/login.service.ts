import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Login } from './login';
import { environment } from '../../environments/environment';
import { Tutor } from '../models/tutor';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient);
  
  API = environment.SERVIDOR+"/api/login";
  API2 = environment.SERVIDOR+"/api/login/cadastroTutor";

  constructor() { }

  logar(login: Login): Observable<string> {
    return this.http.post<string>(this.API, login, {responseType: 'text' as 'json'});
  }

  /*
  cadastrar(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.API2, usuario);
  }
  */

  cadastrar(tutor: Tutor): Observable<string> {
    return this.http.post<string>(this.API2, tutor, { responseType: 'text' as 'json' });
  }

  addToken(token: string) {
    localStorage.setItem('token', token);
  }

  removerToken() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  jwtDecode() {
    let token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return "";
  }

  hasPermission(role: string) {
    let user = this.jwtDecode() as Tutor;
    if (user.role == role)
      return true;
    else
      return false;
  }

  getUsuarioLogado() {
    return this.jwtDecode() as Tutor;
  }
}