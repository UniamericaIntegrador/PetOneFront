import { Procedimento } from "./procedimento";
import { Tutor } from "./tutor";

export class Paciente {
    id!: number;
    nome!: string;
    especie!: string;
    dataNascimento!: Date;
    raca!: string;
    tutor!: Tutor;
    procedimentos: Procedimento[] = [];

    constructor(id: number, nome: string, especie: string, dataNascimento: Date, raca: string, tutor: Tutor | null){
        this.id = id;
        this.nome = nome;
        this.especie = especie;
        this.dataNascimento = dataNascimento;
        this.raca = raca;
        if(tutor) this.tutor = tutor;
    }
}
