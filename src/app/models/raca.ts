import { Especie } from "./especie";

export class Raca {
    id!: number;
    nome!: string;
    especie!: Especie;
    

    constructor(id: number, nome: string, especie: Especie | null){
        id = this.id;
        nome = this.nome;
        if(especie) this.especie = especie;
    }
}
