export class Tutor {
    id!: number;
    nome!: string;
    cpf!: string;
    idade!: number;
    endereco!: string;

    constructor(id: number, nome: string, cpf: string, idade: number, endereco: string){
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.idade = idade;
        this.endereco = endereco;
    }
}
