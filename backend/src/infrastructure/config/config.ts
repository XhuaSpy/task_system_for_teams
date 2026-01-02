import 'dotenv/config'

export const {
    PORT = 4000,
    DB_PORT = 5432,
    DB_USER = 'postgres',
    DB_PASSWORD = 123456,
    DB_NAME = 'todo_note_api',
} = process.env;