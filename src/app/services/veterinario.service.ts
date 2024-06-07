import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Veterinario } from '../models/veterinario';
import { Endereco } from '../models/endereco';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {

  http = inject(HttpClient);
  
  API = "http://localhost:8080/api/veterinario";
  
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


}