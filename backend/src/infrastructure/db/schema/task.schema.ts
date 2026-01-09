// CREATE TABLE
//     tasks (
//         id_task UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
//         id_group UUID NOT NULL,
//         title VARCHAR(250) NOT NULL,
//         body TEXT NOT NULL,
//         todo_state states DEFAULT 'PENDING' NOT NULL,
//         creation_date TIMESTAMP NOT NULL DEFAULT now (),
//         FOREIGN KEY (id_group) REFERENCES task_groups (id_group),
//         UNIQUE (title, id_group)
//     );

import { pgEnum, pgTable, text, timestamp, unique, uuid, varchar } from "drizzle-orm/pg-core";
import { taskGroupsTable } from "./task_group.schema.ts";
import { relations } from "drizzle-orm";
import { assignmentsTable } from "./assignments.schema.ts";

export const todoStateEnum = pgEnum("states", ["DONE", "PROGRESS", "PENDING"]);

export const tasksTable = pgTable(
  "tasks",
  {
    idTask: uuid("id_task").defaultRandom().primaryKey(),
    idGroup: uuid("id_group")
      .notNull()
      .references(() => taskGroupsTable.idGroup),
    title: varchar({ length: 150 }).notNull(),
    body: text(),
    todoState: todoStateEnum("todo_state").default("PENDING").notNull(),
    creationDate: timestamp("creation_date").defaultNow(),
  },
  (t) => [unique().on(t.idGroup, t.title)]
);

export type TaskTableInsert = typeof tasksTable.$inferInsert;
export type TaskTableSelect = typeof tasksTable.$inferSelect;

export const tasksTableRelations = relations(tasksTable, ({ one, many }) => ({
  assignmentsTable: many(assignmentsTable),
  taskGroupsTable: one(taskGroupsTable, {
    fields: [tasksTable.idTask],
    references: [taskGroupsTable.idGroup],
  }),
}));
