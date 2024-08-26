import { Agendamento } from "../models/agendamento";
import { Raca } from "../models/raca";
import { Tutor } from "../models/tutor";

export class PacienteDTO {
    id!: number;
    nome!: string;
    dataNascimento!: Date;
    raca!: Raca;
    tutor!: Tutor;
    agendamentos: Agendamento[] = [];

    constructor(id: number, nome: string, dataNascimento: Date, raca: Raca | null, tutor: Tutor | null){
        this.id = id;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        if(raca) this.raca = raca;
        if(tutor) this.tutor = tutor;
    }
    
}
