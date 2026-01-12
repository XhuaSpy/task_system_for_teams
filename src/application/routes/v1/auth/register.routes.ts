import { Router } from "express";
import type { UserRegister } from "../../../../service/dto/user/user-register.dto.ts";
import { registerUser } from "../../../controller/register.controller.ts";

const router = Router();

router.post<unknown, unknown, UserRegister>("/", (req, res) => registerUser(req, res));

export default router;
