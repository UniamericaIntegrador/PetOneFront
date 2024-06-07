import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Endereco } from '../models/endereco';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  API = "http://localhost:8080/api/endereco";
  http = inject(HttpClient);

  constructor() { }

  getCEP(cep: string): Observable<any> {
    return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`);
  }

  save(endereco: Endereco): Observable<Endereco> {
    return this.http.post<Endereco>(`${this.API}/save`, endereco);
  }

  update(endereco: Endereco, id: number): Observable<Endereco> {
    return this.http.put<Endereco>(`${this.API}/update/${id}`, endereco);
  }
}
