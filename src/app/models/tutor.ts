import { Endereco } from "./endereco";

export class Tutor {
    id!: number;
    nome!: string;
    cpf!: string;
    idade!: number;
    endereco!: Endereco;

    email!: string;
    username!: string;
    //username = this.email;
    password!: string;
    role!: string;

    constructor(id: number, nome: string, cpf: string, idade: number, endereco: Endereco | null, email: string, username: string, password: string, role: string){
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.idade = idade;
        if(endereco) this.endereco = endereco;
        this.email = email;
        this.username = email;
        this.password = password;
        this.role = role;

    }
}
