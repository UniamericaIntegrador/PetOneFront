import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Procedimento } from '../models/procedimento';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcedimentoService {

  http = inject(HttpClient);

  API = environment.SERVIDOR+"/api/procedimento";

  constructor() { }

  listAll(): Observable<Procedimento[]>{
    return this.http.get<Procedimento[]>(this.API+"/listAll");
  }

  delete(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'});
  }

  save(procedimento: Procedimento): Observable<string>{
    return this.http.post<string>(this.API+"/save", procedimento, {responseType: 'text' as 'json'});
  }

  update(procedimento: Procedimento, id: number): Observable<string>{
    return this.http.put<string>(this.API+"/update/"+id, procedimento, {responseType: 'text' as 'json'});
  }

  findById(id: number): Observable<Procedimento>{
    return this.http.get<Procedimento>(this.API+"/findById/"+id);
  }
}
