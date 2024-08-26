import { Procedimento } from "../models/procedimento";
import { Tutor } from "../models/tutor";
import { Veterinario } from "../models/veterinario";
import { PacienteDTO } from "./pacienteDTO";


export class AgendamentoDTO {
    id!: number;
    nome!: string;
    data!: Date;
    resultado!: string;
    diagnostico!: string;
    veterinario!: Veterinario;
    id_paciente!: number;
    paciente_nome!: string;
    paciente!: PacienteDTO;
    procedimento!: Procedimento;
    tutor!: Tutor;

    constructor(id: number, nome: string, data: Date, resultado: string, diagnostico: string, veterinario: Veterinario | null, paciente: PacienteDTO | null, procedimento: Procedimento | null, tutor: Tutor | null, id_paciente: number | null, paciente_nome: string | null){
        this.id = id;
        this.nome = nome;
        this.data = data;
        this.resultado = resultado;
        this.diagnostico = diagnostico;
        if(veterinario) this.veterinario = veterinario;
        if(paciente) this.paciente = paciente;
        if(procedimento) this.procedimento = procedimento;
        if(tutor) this.tutor = tutor;
        if(id_paciente) this.id_paciente = id_paciente;
        if(paciente_nome) this.paciente_nome = paciente_nome;
    }
}