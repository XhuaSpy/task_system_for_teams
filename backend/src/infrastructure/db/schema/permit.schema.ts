import { index, integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { permissionsTable } from "./permissions.schema.ts";
import { rolesTable } from "./role.schema.ts";
import { relations } from "drizzle-orm";

export const permitTable = pgTable(
  "permit",
  {
    codeRole: integer()
      .notNull()
      .references(() => rolesTable.codeRole),
    codePermission: integer()
      .notNull()
      .references(() => permissionsTable.codePermission),
  },
  (t) => [
    primaryKey({ columns: [t.codeRole, t.codePermission] }),
    index().on(t.codeRole),
    index().on(t.codePermission),
  ]
);

export type PermitInsert = typeof permitTable.$inferInsert;
export type PermitSelect = typeof permitTable.$inferSelect;

export const permitTableRelations = relations(permitTable, ({ one }) => ({
  rolesTable: one(rolesTable, {
    fields: [permitTable.codeRole],
    references: [rolesTable.codeRole],
  }),
  permissionsTable: one(permissionsTable, {
    fields: [permitTable.codeRole],
    references: [permissionsTable.codePermission],
  }),
}));
