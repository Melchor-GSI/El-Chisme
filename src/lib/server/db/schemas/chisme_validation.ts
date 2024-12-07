import { AnyPgColumn, integer, pgTable, serial } from "drizzle-orm/pg-core";
import { ChismeTable } from "./chisme";
import { UserTable } from "./user";

export const ChismeValidationTable = pgTable("chisme-validations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references((): AnyPgColumn => UserTable.id),
  chismeId: integer("chisme_id")
    .references((): AnyPgColumn => ChismeTable.id)
    .notNull(),
});
