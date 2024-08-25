import { Paciente } from "./paciente";
import { Procedimento } from "./procedimento";
import { Veterinario } from "./veterinario";

export class Agendamento {
    id!: number;
    nome!: string;
    data!: Date;
    resultado!: string;
    diagnostico!: string;
    veterinario!: Veterinario;
    paciente!: Paciente;
    procedimento!: Procedimento;

    constructor(id: number, nome: string, data: Date, resultado: string, diagnostico: string, veterinario: Veterinario, paciente: Paciente, procedimento: Procedimento ){
        this.id = id;
        this.nome = nome;
        this.data = data;
        this.resultado = resultado;
        this.diagnostico = diagnostico;
        if(veterinario) this.veterinario = veterinario;
        if(paciente) this.paciente = paciente;
        if(procedimento) this.procedimento = procedimento;
    }
}