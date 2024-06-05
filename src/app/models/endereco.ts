export class Endereco {
    cep!: string;
    logradouro!: string;
    cidade!: string;
    bairro!: string;
    uf!: string;
    complemento!: string;

    constructor(cep: string, logradouro: string, cidade: string, bairro: string, uf: string, complemento: string){
        cep = this.cep;
        logradouro = this.logradouro;
        cidade = this.cidade;
        bairro = this.bairro;
        uf = this.uf;
        complemento = this.complemento
    }
}
