import { DB } from "../../../../infrastructure/db/drizzle.ts";
import { User } from "../../../model/user.model.ts";
import type { IUserRepository } from "../../interfaces/user.irepository.ts";

export class PgUserRepository implements IUserRepository {
  async getById(id: string): Promise<User | null> {
    const user = await DB.query.usersTable.findFirst({
      where: (userSchema, { eq }) => eq(userSchema.idUser, id),
    });

    if (!user) return null;

    const userReturned = new User(user.idUser, user.hashedPassword, user.username, user.email);

    return userReturned;
  }

  getAll(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  save(e: User): User {
    throw new Error("Method not implemented.");
  }
  put(e: User, eM: User): User {
    throw new Error("Method not implemented.");
  }
  delete(e: string | User): void {
    throw new Error("Method not implemented.");
  }
}
