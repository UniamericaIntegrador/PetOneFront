import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Agendamento } from '../models/agendamento';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  http = inject(HttpClient);

  API = environment.SERVIDOR+"/api/agendamento";

  constructor() { }

  findByTutor(id: number): Observable<Agendamento[]>{
    return this.http.get<Agendamento[]>(this.API+"/listbypaciente/" + id);
  }

  listAll(): Observable<Agendamento[]>{
    return this.http.get<Agendamento[]>(this.API+"/listAll");
  }

  delete(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'});
  }

  save(agendamento: Agendamento): Observable<string>{
    return this.http.post<string>(this.API+"/save", agendamento, {responseType: 'text' as 'json'});
  }

  update(agendamento: Agendamento, id: number): Observable<string>{
    return this.http.put<string>(this.API+"/update/"+id, agendamento, {responseType: 'text' as 'json'});
  }

  findById(id: number): Observable<Agendamento>{
    return this.http.get<Agendamento>(this.API+"/findById/"+id);
  }
  
  findByNome(nome: string): Observable<Agendamento[]>{
    return this.http.get<Agendamento[]>(this.API+"/findByNomeAgendamento/"+nome);
  }

}
