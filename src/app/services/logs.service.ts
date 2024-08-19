import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Logs } from '../models/logs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  http = inject(HttpClient);
  API = environment.SERVIDOR+"/api/logs";

  listAll(): Observable<Logs[]>{
    return this.http.get<Logs[]>(this.API+"/listAll");
  }
}
