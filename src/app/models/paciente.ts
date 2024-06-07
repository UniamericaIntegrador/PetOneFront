import { Especie } from "./especie";
import { Procedimento } from "./procedimento";
import { Raca } from "./raca";
import { Tutor } from "./tutor";

export class Paciente {
    id!: number;
    nome!: string;
    especie!: Especie;
    dataNascimento!: Date;
    raca!: Raca;
    tutor!: Tutor;
    procedimentos: Procedimento[] = [];

    constructor(id: number, nome: string, especie: Especie | null, dataNascimento: Date, raca: Raca | null, tutor: Tutor | null){
        this.id = id;
        this.nome = nome;
        if(especie) this.especie = especie;
        this.dataNascimento = dataNascimento;
        if(raca) this.raca = raca;
        if(tutor) this.tutor = tutor;
    }
}
