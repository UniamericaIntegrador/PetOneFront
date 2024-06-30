import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Tutor } from '../models/tutor';
import { environment } from '../../environments/environment';
import { JwtPayload, jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TutorService {
  http = inject(HttpClient);
  
  API = environment.SERVIDOR+"/api/tutor";

  constructor() { }
  listAll(): Observable<Tutor[]>{
    return this.http.get<Tutor[]>(this.API+"/listAll");
  }

  delete(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'});
  }

  
  save(tutor: Tutor): Observable<string>{
    return this.http.post<string>(this.API+"/save", tutor, {responseType: 'text' as 'json'});
  }
  
  
  

  update(tutor: Tutor, id: number): Observable<string>{
    return this.http.put<string>(this.API+"/update/"+id, tutor, {responseType: 'text' as 'json'});
  }

  findById(id: number): Observable<Tutor>{
    return this.http.get<Tutor>(this.API+"/findById/"+id);
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