import Express from "express";

import { PORT } from "./config/config.js";

const app = Express();

import v1MainRouter from "../application/routes/v1/main.route.ts";

app.use("/v1", v1MainRouter);

export function startServer() {
  app.listen(PORT, () => {
    console.log(PORT);
  });
}
