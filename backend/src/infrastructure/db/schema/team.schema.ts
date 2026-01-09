import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { membersTable } from "./member.schema.ts";
import { relations } from "drizzle-orm";

export const teamsTable = pgTable("teams", {
  idTeam: uuid('id_team').defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
});

export type TeamInsert = typeof teamsTable.$inferInsert;
export type TeamSelect = typeof teamsTable.$inferSelect;

export const teamsTableRelations = relations(teamsTable, ({ many }) => ({
  membersTable: many(membersTable),
}))