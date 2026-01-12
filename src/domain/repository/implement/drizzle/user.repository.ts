import { eq } from "drizzle-orm";
import { DB } from "../../../../infrastructure/db/drizzle.ts";
import { usersTable } from "../../../../infrastructure/db/schema/user.schema.ts";
import type { UserRegister } from "../../../../service/dto/user/user-register.dto.ts";
import { User } from "../../../model/user.model.ts";
import type { IUserRepository } from "../../interfaces/user.irepository.ts";

export class UserRepository implements IUserRepository {
  async getById(id: string): Promise<User | undefined> {
    const user = await DB.query.usersTable.findFirst({
      where: (userSchema, { eq }) => eq(userSchema.idUser, id),
    });

    if (!user) return undefined;

    const userReturned = new User(user.idUser, user.hashedPassword, user.username, user.email);
    return userReturned;
  }

  getAll(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }

  async save(user: UserRegister): Promise<string | undefined> {
    const hashPassword = await User.hashPassword(user.password);

    const userReturned = await DB.insert(usersTable)
      .values({
        username: user.username,
        hashedPassword: hashPassword,
        email: user.email,
      })
      .returning();

    return userReturned[0]?.idUser;
  }

  put(e: User, eM: User): User {
    throw new Error("Method not implemented.");
  }

  delete(e: string | User): void {
    throw new Error("Method not implemented.");
  }

  async getByEmail(email: string): Promise<User | undefined> {
    const user = await DB.query.usersTable.findFirst({
      where: (usersSchema) => eq(usersSchema.email, email)
    });

    return user;
  }
}
