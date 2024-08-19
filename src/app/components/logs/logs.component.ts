import { Component, inject } from '@angular/core';
import { Logs } from '../../models/logs';
import { HttpClient } from '@angular/common/http';
import { LogsService } from '../../services/logs.service';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss'
})
export class LogsComponent {

    lista: Logs[] = [];

    constructor(private logService: LogsService){
      this.loadLogs();
    }

    loadLogs() {
      this.logService.listAll().subscribe({
        next: data => {
          this.lista = data;
        }
      });
    }

}
