export class SystemLogs {
    id!: number;
    operacao!: string;
    descricao!: string;
    data!: Date;

    constructor(id: number, operacao: string, descricao: string, data: Date){
        this.id = id;
        this.operacao = operacao;
        this.descricao = descricao;
        this.data = data;
    }
}
