import { Router } from "express";

import UserRouter from "./user/user.routes.ts";
import LoginRouter from "./auth/login.routes.ts";
import RegisterRouter from "./auth/register.routes.ts";

const router = Router();

router.use("/login", LoginRouter);
router.use("/user", UserRouter);
router.use("/register", RegisterRouter);

export default router;
