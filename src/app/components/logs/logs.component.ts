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

  constructor(private logService: LogsService) {
    this.loadLogs();
    //this.putDummyLog();
  }

  loadLogs() {
    this.logService.listAll().subscribe({
      next: data => {
        this.lista = data;
      }
    });
  }

  putDummyLog() {
    const logs = new Logs();
    logs.origem = 'procedimento';
    logs.acao = 'removido';
    logs.descricao = 'Raio X';
    logs.usuario = 1;
    logs.timestamp = new Date();
    this.lista.push(logs);
  }
}
