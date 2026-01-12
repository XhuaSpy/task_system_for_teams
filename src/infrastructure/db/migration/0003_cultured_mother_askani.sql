CREATE TABLE "permissions" (
	"code_permission" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"desc_scope" text
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"code_role" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "roles_name_unique" UNIQUE("name")
);
