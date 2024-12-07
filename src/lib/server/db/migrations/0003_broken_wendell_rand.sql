ALTER TABLE "products" RENAME COLUMN "categoryId" TO "category_id";--> statement-breakpoint
ALTER TABLE "store" RENAME COLUMN "telephone" TO "phone";--> statement-breakpoint
ALTER TABLE "products" DROP CONSTRAINT "products_categoryId_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "store" ALTER COLUMN "owner" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "chisme" ADD COLUMN "store_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chisme" ADD CONSTRAINT "chisme_store_id_store_store_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."store"("store_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "store" DROP COLUMN IF EXISTS "address";