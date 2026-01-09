import { relations } from "drizzle-orm";
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { permitTable } from "./permit.schema.ts";

export const permissionsTable = pgTable("permissions", {
  codePermission: serial("code_permission").primaryKey(),
  name: varchar({ length: 50 }).notNull(),
  descScope: text("desc_scope"),
});

export const PermissionInsert = typeof permissionsTable.$inferInsert;
export const PermissionSelect = typeof permissionsTable.$inferSelect;

export const permissionsTableRelations = relations(permissionsTable, ({ many }) => ({
  permitTable: many(permitTable),
}));
