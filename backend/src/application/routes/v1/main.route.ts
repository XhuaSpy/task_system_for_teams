import { Router } from "express";

import UserRouter from "./user/user.routes.ts";
import LoginRouter from "./auth/login.routes.ts";

const router = Router();

router.use("/login", LoginRouter);
router.use("/user", UserRouter);

export default router;

