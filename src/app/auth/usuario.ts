
export class Usuario {
  id!: number;
  nome!: string;
  cpf!: string;
  email!: string;
  username = this.email;
  password!: string;
  role!: string;
}
