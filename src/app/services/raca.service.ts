import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Raca } from '../models/raca';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RacaService {

    http = inject(HttpClient);

    API = environment.SERVIDOR+"/api/raca";
    CATAPI = "https://api.thecatapi.com/v1/breeds";
    DOGAPI = "https://api.thedogapi.com/v1/breeds";

    constructor() { }

    listAll(): Observable<Raca[]> {
        return this.http.get<Raca[]>(this.API + "/listAll");
    }

    delete(id: number): Observable<string> {
        return this.http.delete<string>(this.API + "/delete/" + id, { responseType: 'text' as 'json' });
    }

    save(raca: Raca): Observable<Raca> {
        return this.http.post<Raca>(this.API + "/save", raca);
    }

    update(raca: Raca, id: number): Observable<Raca> {
        return this.http.put<Raca>(this.API + "/update/" + id, raca);
    }

    findById(id: number): Observable<Raca> {
        return this.http.get<Raca>(this.API + "/findById/" + id);
    }

    getRacas(): Observable<string[]> {
        return this.http.get<any[]>(this.CATAPI).pipe(
            map(breeds => breeds.map(breed => breed.name))
        );
    }

    getRacasDog(): Observable<string[]> {
        return this.http.get<any[]>(this.DOGAPI).pipe(
            map(breeds => breeds.map(breed => breed.name))
        );
    }
}