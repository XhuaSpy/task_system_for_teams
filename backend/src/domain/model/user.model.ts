export class User {
  idUser?: string;
  hashedPassword?: string;

  constructor(
    public username: string,
    public email: string,
    public phNumber: string,
    public address: string,
    idUser?: string,
    hashedPassword?: string
  ) {
    if (idUser) this.idUser = idUser;
    if (hashedPassword) this.hashedPassword = hashedPassword;
  }
}
