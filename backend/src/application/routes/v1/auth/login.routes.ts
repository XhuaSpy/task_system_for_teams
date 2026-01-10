import { Router } from "express";
import { loginAuth } from "../../../controller/login.controller.ts";

const router = Router();

interface loginInfoRecive {
  gmail: string;
  password: string;
}

router.post("/", (req, res) => loginAuth(req, res));

export default router;
