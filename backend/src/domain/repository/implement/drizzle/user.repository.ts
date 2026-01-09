import { DB } from "../../../../infrastructure/database/db.ts";
import type { UserSelect } from "../../../../infrastructure/database/schema/user.schema.ts";
import type { Loan } from "../../../model/lean.model.ts";
import { User } from "../../../model/user.model.ts";
import type { IUserRepository } from "../../interface/user.irepository.ts";

export class UserRepository implements IUserRepository {
  async getById(id: string): Promise<User | null> {
    const user = await DB.query.usersTable.findFirst({
      where: (userSchema, { eq }) => eq(userSchema.id_user, id),
    });

    if (!user) return null;

    const userReturned = new User(
      user.id_user,
      user.hashed_password,
      user.username,
      user.email,
      user.ph_number,
      user.address
    );

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
  getLoan(u: User): Loan {
    throw new Error("Method not implemented.");
  }
}
