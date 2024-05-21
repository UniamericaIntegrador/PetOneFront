import { Veterinario } from "./veterinario";

export class Procedimento {
    id!: number;
    nomeProcedimento!: string;
    data!: Date;
    resultado!: string;
    diagnostico!: string;
    veterinario!: Veterinario;

    constructor(id: number, nomeProcedimento: string, data: Date, resultado: string, diagnostico: string, veterinario: Veterinario | null){
        this.id = id;
        this.nomeProcedimento = nomeProcedimento;
        this.data = data;
        this.resultado = resultado;
        this.diagnostico = diagnostico;
        if(veterinario) this.veterinario = veterinario;
    }
}