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
        id = this.id;
        cep = this.cep;
        logradouro = this.logradouro;
        numero = this.numero;
        cidade = this.cidade;
        bairro = this.bairro;
        estado = this.estado;
        complemento = this.complemento
    }
}
