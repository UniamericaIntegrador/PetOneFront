import { Component, inject } from '@angular/core';
import { SystemLogs } from '../../../../models/system-logs';
import { SystemLogsService } from '../../../../services/systemlogs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loglist',
  standalone: true,
  imports: [],
  templateUrl: './loglist.component.html',
  styleUrl: './loglist.component.scss'
})
export class LoglistComponent {
  lista: SystemLogs[] = [];
  
  systemlogsService = inject(SystemLogsService)

  constructor() {
    this.listAll();
  }

  listAll(){
    this.systemlogsService.listAll().subscribe({
      next: lista => {
        this.lista = lista;
      },
      error: erro => {
        Swal.fire({
          title: "Ocorreu um erro ao exibir a lista de procedimento",
          icon: "error",
          confirmButtonText: "Ok"
        });
      }
    });
  }
}
