import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Paciente } from '../models/paciente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PacienteService {

  http = inject(HttpClient);
  
  API = "http://localhost:8080/api/paciente";

  constructor() { }
  listAll(): Observable<Paciente[]>{
    return this.http.get<Paciente[]>(this.API+"/listAll");
  }

  delete(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'});
  }

  save(paciente: Paciente): Observable<string>{
    return this.http.post<string>(this.API+"/save", paciente, {responseType: 'text' as 'json'});
  }

  update(paciente: Paciente, id: number): Observable<string>{
    return this.http.put<string>(this.API+"/update/"+id, paciente, {responseType: 'text' as 'json'});
  }

  findById(id: number): Observable<Paciente>{
    return this.http.get<Paciente>(this.API+"/findById/"+id);
  }
}