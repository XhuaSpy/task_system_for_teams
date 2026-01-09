import { relations, sql } from "drizzle-orm";
import { check, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./user.schema.ts";
import { teamsTable } from "./team.schema.ts";
import { tasksTable } from "./task.schema.ts";

export const taskGroupsTable = pgTable(
  "task_groups",
  {
    idGroup: uuid("id_group").defaultRandom().primaryKey(),
    idOwnerUser: uuid("id_owner_user").references(() => usersTable.idUser),
    idOwnerTeam: uuid("id_owner_team").references(() => teamsTable.idTeam),
    name: varchar({ length: 150 }).notNull(),
    description: text(),
  },
  (t) => [
    check(
      "owner_check",
      sql` 
        (
          ${t.idOwnerTeam} IS NOT NULL 
          and ${t.idOwnerUser} IS NULL 
        ) 
        or 
        (
          ${t.idOwnerTeam} IS NULL
          and ${t.idOwnerUser} IS NOT NULL 
        )
      `
    ),
  ]
);

export const TaskGroupsTableInsert = typeof taskGroupsTable.$inferInsert;
export const TaskGroupsTableSelect = typeof taskGroupsTable.$inferSelect;

export const taskGroupsTableRelations = relations(taskGroupsTable, ({ one, many }) => ({
  tasksTable: many(tasksTable),
  usersTable: one(usersTable, {
    fields: [taskGroupsTable.idOwnerUser],
    references: [usersTable.idUser],
  }),
  teamsTable: one(teamsTable, {
    fields: [taskGroupsTable.idOwnerTeam],
    references: [teamsTable.idTeam],
  }),
}));
