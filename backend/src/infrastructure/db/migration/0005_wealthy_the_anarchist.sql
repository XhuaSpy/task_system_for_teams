ALTER TABLE "permit" DROP CONSTRAINT "permit_codeRole_codePermission_pk";--> statement-breakpoint
CREATE INDEX "permit_codeRole_index" ON "permit" USING btree ("codeRole");--> statement-breakpoint
CREATE INDEX "permit_codePermission_index" ON "permit" USING btree ("codePermission");