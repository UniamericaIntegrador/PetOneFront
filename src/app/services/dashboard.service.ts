import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Paciente } from '../models/paciente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  http = inject(HttpClient);

  API = "http://localhost:8080/api";

  constructor() { }

  getPacientesCount(): Observable<number> {
    return this.http.get<number>("http://localhost:8080/api/paciente/count");
  }

  getTutoresCount(): Observable<number> {
    return this.http.get<number>("http://localhost:8080/api/tutor/count");
  }

  getVeterinariosCount(): Observable<number> {
    return this.http.get<number>("http://localhost:8080/api/veterinario/count");
  }

  getProcedimentosCount(): Observable<number> {
    return this.http.get<number>("http://localhost:8080/api/procedimento/count");
  }

}
