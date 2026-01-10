import type { User } from "../../model/user.model.ts";
import type { Repository } from "../repository.ts";

export interface IUserRepository extends Repository<User > {
  getByEmail(gmail: string) : Promise<User | undefined>;
}
