export class Procedimento {
    id!: number;
    nomeProcedimento!: string;
    data!: Date;
    resultado!: string;
    diagnostico!: string;

    constructor(id: number, nomeProcedimento: string, data: Date, resultado: string, diagnostico: string){
        this.id = id;
        this.nomeProcedimento = nomeProcedimento;
        this.data = data;
        this.resultado = resultado;
        this.diagnostico = diagnostico;
    }
}
