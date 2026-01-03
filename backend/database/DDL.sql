CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE states AS ENUM ('DONE', 'PROGRESS', 'PENDING');

CREATE TYPE type_requests AS ENUM ('INVITE', 'REQUEST');

CREATE TYPE status_requests AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

CREATE TABLE
    users (
        id_user UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        hashed_password TEXT NOT NULL
    );

CREATE TABLE
    teams (
        id_team UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT
    );

CREATE TABLE
    roles (
        code_role SERIAL PRIMARY KEY,
        name VARCHAR(20) NOT NULL UNIQUE
    );

CREATE TABLE
    permissions (
        code_permission SERIAL PRIMARY KEY,
        name VARCHAR(20) NOT NULL UNIQUE,
        desc_scope TEXT NOT NULL
    );

CREATE TABLE
    permit (
        code_role INTEGER NOT NULL,
        code_permission INTEGER NOT NULL,
        FOREIGN KEY fk_code_role (code_role) REFERENCES roles (code_role),
        FOREIGN KEY fk_code_permission (code_permission) REFERENCES permissions (code_permission),
        PRIMARY KEY (code_role, code_permission)
    );

CREATE TABLE
    members (
        id_member UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
        id_user UUID NOT NULL,
        id_team UUID NOT NULL,
        code_role INTEGER NOT NULL,
        start_date TIMESTAMP NOT NULL DEFAULT now(),
        end_date TIMESTAMP,
        FOREIGN KEY fk_id_user (id_user) REFERENCES users (id_user),
        FOREIGN KEY fk_id_team (id_team) REFERENCES teams (id_team),
        FOREIGN KEY fk_code_role (code_role) REFERENCES roles (code_role)
    );

CREATE TABLE
    task_groups (
        id_group UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
        id_owner_user UUID,
        id_owner_team UUID,
        name VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        FOREIGN KEY fk_id_user (id_owner_user) REFERENCES users (id_user),
        FOREIGN KEY fk_id_team (id_owner_team) REFERENCES teams (id_team),
        CHECK (
            (
                id_owner_user IS NOT NULL
                AND id_owner_team IS NULL
            )
            OR (
                id_owner_user IS NULL
                AND id_owner_team IS NOT NULL
            )
        )
    );

CREATE TABLE
    tasks (
        id_task UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
        id_group UUID NOT NULL,
        title VARCHAR(250) NOT NULL,
        body TEXT NOT NULL,
        todo_state states DEFAULT 'PENDING' NOT NULL,
        creation_date TIMESTAMP NOT NULL DEFAULT now (),
        FOREIGN KEY (id_group) REFERENCES task_groups (id_group),
        UNIQUE (title, id_group)
    );

CREATE TABLE
    assignments (
        id_member UUID NOT NULL,
        id_task UUID NOT NULL,
        FOREIGN KEY fk_id_member (id_member) REFERENCES members (id_member),
        FOREIGN KEY fk_id_task (id_task) REFERENCES tasks (id_task),
        PRIMARY KEY (id_member, id_task)
    );

CREATE TABLE
    team_membership_requests (
        id_menbership UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
        id_user UUID NOT NULL,
        id_team UUID NOT NULL,
        create_by UUID NOT NULL,
        type_request type_requests NOT NULL,
        req_status status_requests DEFAULT 'PENDING' NOT NULL,
        date_request TIMESTAMP NOT NULL DEFAULT now (),
        date_response TIMESTAMP,
        FOREIGN KEY (id_user) REFERENCES users (id_user),
        FOREIGN KEY (id_team) REFERENCES teams (id_team),
        FOREIGN KEY (create_by) REFERENCES members (id_member)
    );