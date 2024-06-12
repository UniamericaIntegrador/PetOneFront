import { Endereco } from "./endereco";

export class Veterinario {
    id!: number;
    nome!: string;
    crmv!: string;
    endereco!: Endereco;

    constructor(id: number, nome: string, crmv: string, endereco: Endereco | null){
        this.id = id;
        this.nome = nome;
        this.crmv = crmv;
        if(endereco) this.endereco = endereco;
    }
}
