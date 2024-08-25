import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Veterinario } from '../models/veterinario';
import { Endereco } from '../models/endereco';
import { environment } from '../../environments/environment';
import { JwtPayload, jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {

  http = inject(HttpClient);
  
  API = environment.SERVIDOR+"/api/veterinario";
  API2 = environment.SERVIDOR+"/api/login/cadastroVeterinario";
  API3 = environment.SERVIDOR+"/api/login";
  
  APIENDERECO = "http://localhost:8080/api/endereco";

  constructor() { }
  listAll(): Observable<Veterinario[]>{
    return this.http.get<Veterinario[]>(this.API+"/listAll");
  }

  delete(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'});
  }

  save(veterinario: Veterinario): Observable<string>{
    return this.http.post<string>(this.API+"/save", veterinario, {responseType: 'text' as 'json'});
  }

  update(veterinario: Veterinario, id: number): Observable<string>{
    return this.http.put<string>(this.API+"/update/"+id, veterinario, {responseType: 'text' as 'json'});
  }

  findById(id: number): Observable<Veterinario>{
    return this.http.get<Veterinario>(this.API+"/findById/"+id);
  }

  findByIdEndereco(id: number): Observable<Endereco>{
    return this.http.get<Endereco>(this.API+"/findById/"+id);
  }

  logar(veterinario: Veterinario): Observable<string> {
    return this.http.post<string>(this.API3, veterinario, {responseType: 'text' as 'json'});
  }

  cadastrar(veterinario: Veterinario): Observable<string> {
    return this.http.post<string>(this.API2, veterinario, { responseType: 'text' as 'json' });
  }

  findByNome(nome: string): Observable<Veterinario[]>{
    return this.http.get<Veterinario[]>(this.API+"/findByNomeStartingWith/"+nome);
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
    let user = this.jwtDecode() as Veterinario;
    if (user.role == role)
      return true;
    else
      return false;
  }

  getUsuarioLogado() {
    return this.jwtDecode() as Veterinario;
  }


}