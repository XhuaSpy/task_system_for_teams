import type { UserRegister } from "../../dto/user/user-register.dto.ts";
import type { IUserRepository } from "../../../domain/repository/interfaces/user.irepository.ts";
import { UserRepository } from "../../../domain/repository/implement/drizzle/user.repository.ts";

export const registerUser = async (user: UserRegister): Promise<string | undefined> => {
  const repository: IUserRepository = new UserRepository();
  return repository.save(user);
};
