import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { Procedimento } from '../../../models/procedimento';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcedimentoService } from '../../../services/procedimento.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { TutoreslistComponent } from '../../tutores/tutoreslist/tutoreslist.component';
import { VeterinarioslistComponent } from '../../veterinarios/veterinarioslist/veterinarioslist.component';
import { Veterinario } from '../../../models/veterinario';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-procedimentosdetails',
  standalone: true,
  imports: [FormsModule, MdbModalModule, TutoreslistComponent, VeterinarioslistComponent, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatCheckboxModule, MatSelectModule],
  templateUrl: './procedimentosdetails.component.html',
  styleUrl: './procedimentosdetails.component.scss'
})

export class ProcedimentosdetailsComponent {
  @Input("procedimento") procedimento: Procedimento = new Procedimento(0,'', new Date(),'','',null);
  @Output("retorno") retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute);
  router2 = inject(Router);

  modalService = inject(MdbModalService);
  @ViewChild('modalVeterinarios') modalVeterinarios!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  procedimentoService = inject(ProcedimentoService);

  startDate = new Date(2024, 6, 6);

  novadata!: Date;

  datePipe: DatePipe = new DatePipe('en-US');

  constructor(){
    let id = this.router.snapshot.params["id"];
    if(id > 0){
      this.findById(id);
    }else{
      if(this.procedimento.id > 0){
        this.findById(id);
      }
    }
  }

  findById(id: number){
    this.procedimentoService.findById(id).subscribe({
      next: retorno => {
        this.procedimento = retorno;
      },
      error: erro => {
        Swal.fire({
          title: "Algo deu errado na busca, tente novamente.",
          icon: "error",
          confirmButtonText: "Ok"
        });
      },
    });
  }

  save() {
    console.log(this.procedimento);
    if (this.procedimento.data instanceof Date) {
      this.procedimento.data = this.datePipe.transform(this.procedimento.data, 'yyyy-MM-dd') as unknown as Date;
    }
    console.log(this.procedimento);
    if (this.procedimento.id > 0) {
      this.procedimentoService.update(this.procedimento, this.procedimento.id).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/procedimentos'], {
            state: { procedimentoNovo: this.procedimento },
          });
          this.retorno.emit(this.procedimento);
        },
        error: erro => {
          Swal.fire({
            title: 'Erro ao editar o cadastro de procedimento',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    } else {
      this.procedimentoService.save(this.procedimento).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            confirmButtonColor: '#54B4D3',
            text: 'procedimento salvo com sucesso!',
            icon: 'success',
          });
          this.router2.navigate(['admin/procedimentos'], {
            state: { procedimentoNovo: this.procedimento },
          });
          this.retorno.emit(this.procedimento);
        },
        error: erro => {
          Swal.fire({
            title: 'Erro ao salvar o procedimento',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    }
  }

  buscarVeterinario() {
    this.modalRef = this.modalService.open(this.modalVeterinarios, { modalClass: 'modal-lg' });
  }

  retornoVeterinario(veterinario: Veterinario) {
    this.procedimento.veterinario = veterinario;
    this.modalRef.close();
  }
  /*
  onDateChange(date: Date) {
    if (date) {
      const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd'); // Format date if not null
      this.procedimento.data = formattedDate; // Assign formatted date to procedimento.data
    } else {
      this.procedimento.data = null; // Handle null case as needed
    }
  }
  */
  }
