import { pgTable, uuid, primaryKey } from "drizzle-orm/pg-core";
import { membersTable } from "./member.schema.ts";
import { tasksTable } from "./task.schema.ts";
import { relations } from "drizzle-orm";

export const assignmentsTable = pgTable(
  "assignments",
  {
    idMember: uuid("id_member")
      .notNull()
      .references(() => membersTable.idMember),
    idTask: uuid("id_task")
      .notNull()
      .references(() => tasksTable.idTask),
  },
  (t) => [primaryKey({ columns: [t.idMember, t.idTask] })]
);

export type AssignmentsTableInsert = typeof assignmentsTable.$inferInsert;
export type AssignmentsTableSelect = typeof assignmentsTable.$inferSelect;

export const assignmentsTableRelations = relations(assignmentsTable, ({ one }) => ({
  membersTable: one(membersTable, {
    fields: [assignmentsTable.idMember],
    references: [membersTable.idMember],
  }),
  tasksTable: one(tasksTable, {
    fields: [assignmentsTable.idTask],
    references: [tasksTable.idTask],
  }),
}));
