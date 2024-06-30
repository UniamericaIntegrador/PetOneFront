import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Especie } from '../models/especie';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EspecieService {

    http = inject(HttpClient);
    API = environment.SERVIDOR+"/api/especie";

    constructor() { }

    listAll(): Observable<Especie[]> {
        return this.http.get<Especie[]>(this.API + "/listAll");
    }

    delete(id: number): Observable<string> {
        return this.http.delete<string>(this.API + "/delete/" + id, { responseType: 'text' as 'json' });
    }

    save(especie: Especie): Observable<Especie> {
        return this.http.post<Especie>(this.API + "/save", especie);
    }

    update(especie: Especie, id: number): Observable<Especie> {
        return this.http.put<Especie>(this.API + "/update/" + id, especie);
    }

    findById(id: number): Observable<Especie> {
        return this.http.get<Especie>(this.API + "/findById/" + id);
    }

    findByNome(nome: string): Observable<Especie[]>{
        return this.http.get<Especie[]>(this.API + "/findbynome/" + nome);
    }
}