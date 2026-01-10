import bcrypt from "bcrypt";
import { SALT_KEY } from "../../infrastructure/config/config.ts";

export class User {
  idUser?: string;
  hashedPassword?: string;

  constructor(
    public username: string,
    public email: string,
    idUser?: string,
    hashedPassword?: string
  ) {
    if (idUser) this.idUser = idUser;
    if (hashedPassword) this.hashedPassword = hashedPassword;
  }

  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_KEY);
  }

  static async compareHashedPasswords(password: string, hashedPassword: string): Promise<Boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
