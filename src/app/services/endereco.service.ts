import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Endereco } from '../models/endereco';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  API = environment.SERVIDOR+"/api/endereco";
  http = inject(HttpClient);

  constructor() { }

  getCEP(cep: string): Observable<any> {
    return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`);
  }

  save(endereco: Endereco): Observable<Endereco> {
    return this.http.post<Endereco>(`${this.API}/save`, endereco);
  }

  update(endereco: Endereco, id: number): Observable<string>{
    return this.http.put<string>(this.API+"/update/"+id, endereco, {responseType: 'text' as 'json'});
  }

  findById(id: number): Observable<Endereco>{
    return this.http.get<Endereco>(this.API+"/findById/"+id);
  }

  delete(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'});
  }

  listAll(): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(this.API+"/listAll");
  }
}