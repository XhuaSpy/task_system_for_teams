CREATE TABLE "permit" (
	"codeRole" integer NOT NULL,
	"codePermission" integer NOT NULL,
	CONSTRAINT "permit_codeRole_codePermission_pk" PRIMARY KEY("codeRole","codePermission")
);
--> statement-breakpoint
ALTER TABLE "permit" ADD CONSTRAINT "permit_codeRole_roles_code_role_fk" FOREIGN KEY ("codeRole") REFERENCES "public"."roles"("code_role") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "permit" ADD CONSTRAINT "permit_codePermission_permissions_code_permission_fk" FOREIGN KEY ("codePermission") REFERENCES "public"."permissions"("code_permission") ON DELETE no action ON UPDATE no action;