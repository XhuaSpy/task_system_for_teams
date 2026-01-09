import { relations } from "drizzle-orm";
import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { permitTable } from "./permit.schema.ts";
import { membersTable } from "./member.schema.ts";

export const rolesTable = pgTable("roles", {
  codeRole: serial('code_role').primaryKey(),
  name: varchar({ length: 255 }).notNull().unique(),
});

export type RoleInsert = typeof rolesTable.$inferInsert;
export type RoleSelect = typeof rolesTable.$inferSelect;

export const rolesTableRelations = relations(rolesTable, ({ many }) => ({
  permitTable: many(permitTable),
  membersTable: many(membersTable),
}))
