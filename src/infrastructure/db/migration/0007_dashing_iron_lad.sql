CREATE TYPE "public"."states" AS ENUM('DONE', 'PROGRESS', 'PENDING');--> statement-breakpoint
CREATE TYPE "public"."request_status" AS ENUM('PENDING', 'ACCEPTED', 'REJECTED');--> statement-breakpoint
CREATE TYPE "public"."request_type" AS ENUM('INVITE', 'REQUEST');--> statement-breakpoint
CREATE TABLE "members" (
	"id_member" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_user" uuid NOT NULL,
	"id_team" uuid NOT NULL,
	"code_role" integer NOT NULL,
	"start_date" timestamp DEFAULT now(),
	"end_date" timestamp
);
--> statement-breakpoint
CREATE TABLE "task_groups" (
	"id_group" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_owner_user" uuid,
	"id_owner_team" uuid,
	"name" varchar(150) NOT NULL,
	"description" text,
	CONSTRAINT "owner_check" CHECK ( 
        (
          "task_groups"."id_owner_team" IS NOT NULL 
          and "task_groups"."id_owner_user" IS NULL 
        ) 
        or 
        (
          "task_groups"."id_owner_team" IS NULL
          and "task_groups"."id_owner_user" IS NOT NULL 
        )
      )
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"id_task" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_group" uuid NOT NULL,
	"title" varchar(150) NOT NULL,
	"body" text,
	"todo_state" "states" DEFAULT 'PENDING' NOT NULL,
	"creation_date" timestamp DEFAULT now(),
	CONSTRAINT "tasks_id_group_title_unique" UNIQUE("id_group","title")
);
--> statement-breakpoint
CREATE TABLE "assignments" (
	"id_member" uuid NOT NULL,
	"id_task" uuid NOT NULL,
	CONSTRAINT "assignments_id_member_id_task_pk" PRIMARY KEY("id_member","id_task")
);
--> statement-breakpoint
CREATE TABLE "team_membership_requests" (
	"id_menbership" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_user" uuid NOT NULL,
	"id_team" uuid NOT NULL,
	"create_by" uuid NOT NULL,
	"req_status" "request_status" DEFAULT 'PENDING',
	"type_request" "request_type" NOT NULL,
	"date_request" timestamp DEFAULT now(),
	"date_response" timestamp
);
--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_id_user_users_id_user_fk" FOREIGN KEY ("id_user") REFERENCES "public"."users"("id_user") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_id_team_teams_id_team_fk" FOREIGN KEY ("id_team") REFERENCES "public"."teams"("id_team") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_code_role_roles_code_role_fk" FOREIGN KEY ("code_role") REFERENCES "public"."roles"("code_role") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task_groups" ADD CONSTRAINT "task_groups_id_owner_user_users_id_user_fk" FOREIGN KEY ("id_owner_user") REFERENCES "public"."users"("id_user") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task_groups" ADD CONSTRAINT "task_groups_id_owner_team_teams_id_team_fk" FOREIGN KEY ("id_owner_team") REFERENCES "public"."teams"("id_team") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_id_group_task_groups_id_group_fk" FOREIGN KEY ("id_group") REFERENCES "public"."task_groups"("id_group") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_id_member_members_id_member_fk" FOREIGN KEY ("id_member") REFERENCES "public"."members"("id_member") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_id_task_tasks_id_task_fk" FOREIGN KEY ("id_task") REFERENCES "public"."tasks"("id_task") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_membership_requests" ADD CONSTRAINT "team_membership_requests_id_user_users_id_user_fk" FOREIGN KEY ("id_user") REFERENCES "public"."users"("id_user") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_membership_requests" ADD CONSTRAINT "team_membership_requests_id_team_teams_id_team_fk" FOREIGN KEY ("id_team") REFERENCES "public"."teams"("id_team") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_membership_requests" ADD CONSTRAINT "team_membership_requests_create_by_members_id_member_fk" FOREIGN KEY ("create_by") REFERENCES "public"."members"("id_member") ON DELETE no action ON UPDATE no action;