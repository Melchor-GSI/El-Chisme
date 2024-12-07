import { AnyPgColumn, integer, pgTable, serial } from "drizzle-orm/pg-core";
import { ChismeTable } from "./chisme";
import { UserTable } from "./user";

export const ChismeValidationTable = pgTable("chisme-validations", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references((): AnyPgColumn => UserTable.id),
  chisme_id: integer("chisme_id")
    .references((): AnyPgColumn => ChismeTable.id)
    .notNull(),
});
