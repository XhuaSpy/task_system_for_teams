import "dotenv/config";

export const {
  PORT = 4000,
  DB_PORT = 5432,
  DB_USER = "postgres",
  DB_PASSWORD = 123456,
  DB_NAME = "todo_note_api",
  DATABASE_URL,
} = process.env;

export const SALT_KEY = process.env.SALT_KEY ? parseInt(process.env.SALT_KEY) : 2;
