import { pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { usersTable } from "./user.schema.ts";
import { teamsTable } from "./team.schema.ts";
import { membersTable } from "./member.schema.ts";
import { relations } from "drizzle-orm";

export const requestStatusEnum = pgEnum("request_status", ["PENDING", "ACCEPTED", "REJECTED"]);
export const requestTypeEnum = pgEnum("request_type", ["INVITE", "REQUEST"]);

export const teamMembershipRequestsTable = pgTable(
  "team_membership_requests",
  {
    idMenbership: uuid("id_menbership").defaultRandom().primaryKey(),
    idUser: uuid("id_user")
      .notNull()
      .references(() => usersTable.idUser),
    idTeam: uuid("id_team")
      .notNull()
      .references(() => teamsTable.idTeam),
    createBy: uuid("create_by")
      .notNull()
      .references(() => membersTable.idMember),
    reqStatus: requestStatusEnum("req_status").default("PENDING"),
    reqType: requestTypeEnum("type_request").notNull(),
    dateRequest: timestamp("date_request").defaultNow(),
    dateResponse: timestamp("date_response"),
  },
  (t) => []
);

export type ReamMembershipRequestsTableInsert = typeof teamMembershipRequestsTable.$inferInsert;
export type ReamMembershipRequestsTableSelect = typeof teamMembershipRequestsTable.$inferSelect;

export const teamMembershipRequestsTableRelations = relations(
  teamMembershipRequestsTable,
  ({ one }) => ({
    usersTable: one(usersTable, {
      fields: [teamMembershipRequestsTable.idUser],
      references: [usersTable.idUser],
    }),
    teamsTable: one(teamsTable, {
      fields: [teamMembershipRequestsTable.idTeam],
      references: [teamsTable.idTeam],
    }),
    membersTable: one(membersTable, {
      fields: [teamMembershipRequestsTable.createBy],
      references: [membersTable.idMember],
    }),
  })
);
