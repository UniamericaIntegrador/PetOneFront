import { Paciente } from "./paciente";
import { Procedimento } from "./procedimento";
import { Tutor } from "./tutor";
import { Veterinario } from "./veterinario";

export class Agendamento {
    id!: number;
    nome!: string;
    data!: Date;
    resultado!: string;
    diagnostico!: string;
    veterinario!: Veterinario;
    id_paciente!: number;
    paciente_nome!: string;
    paciente!: Paciente;
    procedimento!: Procedimento;
    tutor!: Tutor;

}