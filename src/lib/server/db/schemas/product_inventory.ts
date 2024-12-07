import { integer, pgTable, text, timestamp, serial, AnyPgColumn } from "drizzle-orm/pg-core";
import { store } from "./store";
import {productsTable} from "./product"

export const product_inventory = pgTable("product_inventory", {
  id: serial("id").primaryKey(),
  store_id: integer("store_id").references((): AnyPgColumn => store.id),
  product_id: integer("product_id").references((): AnyPgColumn => productsTable.id).notNull(),
  quantity: integer("quantity").notNull()
});