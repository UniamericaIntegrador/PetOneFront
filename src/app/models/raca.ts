import { Especie } from "./especie";

export class Raca {
    id!: number;
    nome!: string;
    especie!: Especie;
    

    constructor(id: number, nome: string, especie: Especie | null){
        this.id = id;
        this.nome = nome;
        if(especie) this.especie = especie; 
    }
}
