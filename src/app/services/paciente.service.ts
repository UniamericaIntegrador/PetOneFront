import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Paciente } from '../models/paciente';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PacienteDTO } from '../DTO/pacienteDTO';

@Injectable({
  providedIn: 'root'
})

export class PacienteService {

  http = inject(HttpClient);
  
  API = "http://localhost:8080/api/paciente";
  //CATAPI = "https://api.thecatapi.com/v1/breeds";
  //DOGAPI = "https://api.thedogapi.com/v1/breeds";

  constructor() { }

  listAll(): Observable<Paciente[]>{
    return this.http.get<Paciente[]>(this.API+"/listAll");
  }

  delete(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'});
  }

  save(paciente: PacienteDTO): Observable<string>{
    return this.http.post<string>(this.API+"/save", paciente, {responseType: 'text' as 'json'});
  }

  update(paciente: PacienteDTO, id: number): Observable<string>{
    return this.http.put<string>(this.API+"/update/"+id, paciente, {responseType: 'text' as 'json'});
  }

  findById(id: number): Observable<Paciente>{
    return this.http.get<Paciente>(this.API+"/findById/"+id);
  }

  findByTutor(): Observable<Paciente[]>{
    return this.http.get<Paciente[]>(this.API+"/findbyuser");
  }

  findByNome(nome: string): Observable<Paciente[]>{
    return this.http.get<Paciente[]>(this.API+"/findByPart/"+nome);
  }

  

  /*
  getRacas(): Observable<string[]>{
    return this.http.get<any[]>(this.CATAPI).pipe(
      map(breeds => breeds.map(breed => breed.name))
    );
  }

  getRacasDog(): Observable<string[]>{
    return this.http.get<any[]>(this.DOGAPI).pipe(
      map(breeds => breeds.map(breed => breed.name))
    );
  }
  */
}
