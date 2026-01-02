import Express from "express";

import { PORT } from "./config/config.js";

import loginRouter from "./routes/v1/public.routes.js";
import todoNoteRouter from "./routes/v1/todo-note.routes.js";
import userRouter from "./routes/v1/user.routes.js";

const app = Express();

app.use(loginRouter);
app.use(todoNoteRouter);
app.use(userRouter);

export function startServer() {
  app.listen(PORT, () => {
    console.log(PORT);
  });
}
