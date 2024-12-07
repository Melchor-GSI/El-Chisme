ALTER TABLE "chismes" ADD COLUMN "price" double precision;
UPDATE "chismes" SET "price" = 0.0;
ALTER TABLE "chismes" ALTER COLUMN "price" SET NOT NULL;