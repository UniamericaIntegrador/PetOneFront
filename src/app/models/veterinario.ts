import { Endereco } from "./endereco";

export class Veterinario {
    id!: number;
    nome!: string;
    crmv!: string;
    endereco!: Endereco;

    cpf!: string;
    email!: string;
    username!: string;
    //username = this.email;
    password!: string;
    role!: string;

    constructor(id: number, nome: string, crmv: string, endereco: Endereco | null, cpf: string, email: string, username: string, password: string, role: string){
        this.id = id;
        this.nome = nome;
        this.crmv = crmv;
        if(endereco) this.endereco = endereco;
        this.cpf = cpf;
        this.email = email;
        this.username = email;
        this.password = password;
        this.role = role;
    }
}
