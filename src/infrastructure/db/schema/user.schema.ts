import { relations } from "drizzle-orm";
import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { membersTable } from "./member.schema.ts";

export const usersTable = pgTable("users", {
  idUser: uuid('id_user').defaultRandom().primaryKey(),
  username: varchar({ length: 100 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  hashedPassword: text('hashed_password').notNull(),
});

export type UserInsert = typeof usersTable.$inferInsert;
export type UserSelect = typeof usersTable.$inferSelect;

export const usersTableRelations = relations(usersTable, ({ many }) => ({
  membersTable: many(membersTable),
}))