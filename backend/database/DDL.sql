CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE states AS ENUM ('DONE', 'PROGRESS', 'PENDING');

CREATE TABLE
    users (
        id_user UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        hashed_password TEXT NOT NULL
    );

CREATE TABLE
    todo_notes (
        code_todo_notes UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
        title VARCHAR(250) NOT NULL,
        todo_state states DEFAULT 'PENDING' NOT NULL,
        body text,
        id_user UUID REFERENCES users (id_user) NOT NULL,
        UNIQUE (id_user, title)
    );