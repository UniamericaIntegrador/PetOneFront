import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  http = inject(HttpClient);
  API = environment.SERVIDOR+"/api/logs";

  constructor() { }
}
