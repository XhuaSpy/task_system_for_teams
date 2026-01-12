import type { Request, Response } from "express";
import type { UserRegister } from "../../service/dto/user/user-register.dto.ts";
import { registerUser as service } from "../../service/implementation/auth/register.service.ts";

export const registerUser = async (req: Request<unknown, unknown, UserRegister>, res: Response) => {
  const user = req.body;
  
  try {
    const id = await service(user);
    return res.status(200).json({ id });
  } catch (err) {
    console.log(err);
  }
};
