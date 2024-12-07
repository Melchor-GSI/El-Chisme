import { integer, pgTable, text, timestamp, serial, AnyPgColumn } from "drizzle-orm/pg-core";
import {productsTable} from "./product"
import { usersTable } from "./user";
import { chisme } from "./chisme";

export const product_inventory = pgTable("product_inventory", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references((): AnyPgColumn => usersTable.id),
  chisme_id: integer("chisme_id").references((): AnyPgColumn => chisme.id).notNull(),
});