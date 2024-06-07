import { Endereco } from "./endereco";

export class Tutor {
    id!: number;
    nome!: string;
    cpf!: string;
    idade!: number;
    endereco!: Endereco;

    constructor(id: number, nome: string, cpf: string, idade: number, endereco: Endereco | null){
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.idade = idade;
        if(endereco) this.endereco = endereco;
    }
}
