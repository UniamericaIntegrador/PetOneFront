import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SystemLogs } from '../models/system-logs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemLogsService {

  API = "http://localhost:8080/api/logs";
  http = inject(HttpClient);

  constructor() { }

  listAll(): Observable<SystemLogs[]> {
    return this.http.get<SystemLogs[]>(this.API+"/listAll");
  }
}
