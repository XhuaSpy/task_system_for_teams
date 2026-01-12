import express from "express";

import { PORT } from "./config/config.ts";

import v1MainRouter from "../application/routes/v1/main.route.ts";

const app = express();

app.use(express.json());

app.use("/v1", v1MainRouter);

export function startServer() {
  app.listen(PORT, () => {
    console.log(PORT);
  });
}
