export class Veterinario {
    id!: number;
    nome!: string;
    crmv!: string;
    endereco!: string;

    constructor(id: number, nome: string, crmv: string, endereco: string){
        this.id = id;
        this.nome = nome;
        this.crmv = crmv;
        this.endereco = endereco;
    }
}
