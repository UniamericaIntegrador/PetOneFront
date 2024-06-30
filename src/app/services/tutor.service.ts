import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Tutor } from '../models/tutor';
import { environment } from '../../environments/environment';

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

  /*
  save(tutor: Tutor): Observable<string>{
    return this.http.post<string>(this.API+"/save", tutor, {responseType: 'text' as 'json'});
  }
  */
  

  update(tutor: Tutor, id: number): Observable<string>{
    return this.http.put<string>(this.API+"/update/"+id, tutor, {responseType: 'text' as 'json'});
  }

  findById(id: number): Observable<Tutor>{
    return this.http.get<Tutor>(this.API+"/findById/"+id);
  }

  findByNome(nome: string): Observable<Tutor[]>{
    return this.http.get<Tutor[]>(this.API+"/findByTrechoNome/"+nome);
  }

}
