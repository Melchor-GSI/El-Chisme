CREATE TABLE IF NOT EXISTS "chisme" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"location" integer,
	"created_date" timestamp DEFAULT now() NOT NULL,
	"end_date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_inventory" (
	"id" serial PRIMARY KEY NOT NULL,
	"store_id" integer,
	"product_id" integer NOT NULL,
	"quantity" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "location" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"coordinates" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "store" (
	"store_id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"address" text NOT NULL,
	"telephone" text,
	"shipping_options" text,
	"opening_hours" timestamp,
	"owner" integer NOT NULL,
	"location_id" integer
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "is_merchant" boolean DEFAULT false;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chisme" ADD CONSTRAINT "chisme_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chisme" ADD CONSTRAINT "chisme_location_location_id_fk" FOREIGN KEY ("location") REFERENCES "public"."location"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_inventory" ADD CONSTRAINT "product_inventory_store_id_store_store_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."store"("store_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_inventory" ADD CONSTRAINT "product_inventory_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "store" ADD CONSTRAINT "store_owner_users_id_fk" FOREIGN KEY ("owner") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "store" ADD CONSTRAINT "store_location_id_location_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."location"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
