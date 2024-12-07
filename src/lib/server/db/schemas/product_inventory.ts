import { AnyPgColumn, integer, pgTable, serial } from "drizzle-orm/pg-core";
import { ProductTable } from "./product";
import { StoreTable } from "./store";

export const ProductInventoryTable = pgTable("product-inventories", {
  id: serial("id").primaryKey(),
  store_id: integer("store_id").references((): AnyPgColumn => StoreTable.id),
  product_id: integer("product_id").references((): AnyPgColumn => ProductTable.id).notNull(),
  quantity: integer("quantity").notNull(),
  price:  integer("price").notNull()
});