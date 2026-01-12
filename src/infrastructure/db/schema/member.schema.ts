import { integer, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { usersTable } from "./user.schema.ts";
import { teamsTable } from "./team.schema.ts";
import { rolesTable } from "./role.schema.ts";
import { relations } from "drizzle-orm";
import { assignmentsTable } from "./assignments.schema.ts";

export const membersTable = pgTable("members", {
  idMember: uuid("id_member").defaultRandom().primaryKey(),
  idUser: uuid("id_user")
    .notNull()
    .references(() => usersTable.idUser),
  idTeam: uuid("id_team")
    .notNull()
    .references(() => teamsTable.idTeam),
  codeRole: integer("code_role")
    .notNull()
    .references(() => rolesTable.codeRole),
  startDate: timestamp("start_date").defaultNow(),
  endDate: timestamp("end_date"),
});

export type MemberInsert = typeof membersTable.$inferInsert;
export type MemberSelect = typeof membersTable.$inferSelect;

export const membersTableRelations = relations(membersTable, ({ one, many }) => ({
  assignmentsTable: many(assignmentsTable),
  usersTable: one(usersTable, {
    fields: [membersTable.idUser],
    references: [usersTable.idUser],
  }),
  teamsTable: one(teamsTable, {
    fields: [membersTable.idTeam],
    references: [teamsTable.idTeam],
  }),
  rolesTable: one(rolesTable, {
    fields: [membersTable.codeRole],
    references: [rolesTable.codeRole],
  }),
}));
