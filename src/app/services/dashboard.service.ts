import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Paciente } from '../models/paciente';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  http = inject(HttpClient);

  API = environment.SERVIDOR+"/api";

  constructor() { }

  getPacientesCount(): Observable<number> {
    return this.http.get<number>(this.API+"/paciente/count");
  }

  getTutoresCount(): Observable<number> {
    return this.http.get<number>(this.API+"/tutor/count");
  }

  getVeterinariosCount(): Observable<number> {
    return this.http.get<number>(this.API+"/veterinario/count");
  }

  getProcedimentosCount(): Observable<number> {
    return this.http.get<number>(this.API+"/procedimento/count");
  }

  

}
