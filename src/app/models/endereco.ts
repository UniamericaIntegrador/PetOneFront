export class Endereco {
    cep!: string;
    logradouro!: string;
    localidade!: string;
    bairro!: string;
    uf!: string;
    complemento!: string;

    constructor(cep: string, logradouro: string, localidade: string, bairro: string, uf: string, complemento: string){
        cep = this.cep;
        logradouro = this.logradouro;
        localidade = this.localidade;
        bairro = this.bairro;
        uf = this.uf;
        complemento = this.complemento
    }
}
