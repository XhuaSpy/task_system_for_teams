import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema/index.ts";

import { DATABASE_URL } from "../config/config.ts";

if (!DATABASE_URL) throw new Error("DATABASE_URL: Conect url is required");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const DB = drizzle({
  client: pool,
  logger: {
    logQuery(query, params) {
      console.log("SQL:", query);
      console.log("PARAMS:", params);
    },
  },
  schema,
});
