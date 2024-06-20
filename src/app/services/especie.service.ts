import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Especie } from '../models/especie';

@Injectable({
    providedIn: 'root'
})
export class EspecieService {

    http = inject(HttpClient);

    API = "http://localhost:8080/api/especie";

    constructor() { }

    listAll(): Observable<Especie[]> {
        return this.http.get<Especie[]>(this.API + "/listAll");
    }

    delete(id: number): Observable<string> {
        return this.http.delete<string>(this.API + "/delete/" + id, { responseType: 'text' as 'json' });
    }

    save(especie: Especie): Observable<Especie> {
        return this.http.post<Especie>(this.API + "/save", especie, { responseType: 'text' as 'json' });
    }

    update(especie: Especie, id: number): Observable<string> {
        return this.http.put<string>(this.API + "/update/" + id, especie, { responseType: 'text' as 'json' });
    }

    findById(id: number): Observable<Especie> {
        return this.http.get<Especie>(this.API + "/findById/" + id);
    }
}