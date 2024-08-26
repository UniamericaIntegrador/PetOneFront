import { Endereco } from "../models/endereco";

export class tutorDTO {
    id!: number;
    nome!: string;
    endereco!: Endereco;
    email!: string;
    role!: string;
}