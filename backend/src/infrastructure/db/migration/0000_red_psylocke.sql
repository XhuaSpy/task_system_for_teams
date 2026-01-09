CREATE TABLE "users" (
	"id_user" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"address" text NOT NULL,
	"ph_number" varchar(10) NOT NULL,
	"hashed_password" text NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_ph_number_unique" UNIQUE("ph_number")
);
