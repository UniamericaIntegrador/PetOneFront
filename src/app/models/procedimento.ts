import { Veterinario } from "./veterinario";

export class Procedimento {

    id!: number;
    nomeProcedimento!: string;

    constructor(id: number, nomeProcedimento: string){
        this.id = id;
        this.nomeProcedimento = nomeProcedimento;
    }
}