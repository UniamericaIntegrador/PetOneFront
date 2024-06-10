export class Endereco {
    id!: number;
    cep!: string;
    logradouro!: string;
    numero!:string;
    cidade!: string;
    bairro!: string;
    estado!: string;
    complemento!: string;

    constructor(id: number, cep: string, logradouro: string, numero: string,cidade: string, bairro: string, estado: string, complemento: string){
        this.id = id;
        this.cep = cep;
        this.logradouro = logradouro;
        this.numero = numero;
        this.cidade = cidade;
        this.bairro = bairro;
        this.estado = estado;
        this.complemento = complemento;
    }
}