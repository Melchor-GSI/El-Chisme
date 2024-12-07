import { AnyPgColumn, integer, pgTable, serial } from "drizzle-orm/pg-core";
import { ProductTable } from "./product";
import { StoreTable } from "./store";

export const ProductInventoryTable = pgTable("product-inventories", {
  id: serial("id").primaryKey(),
  storeId: integer("store_id")
    .references((): AnyPgColumn => StoreTable.id)
    .notNull(),
  productId: integer("product_id")
    .references((): AnyPgColumn => ProductTable.id)
    .notNull(),
  quantity: integer("quantity").notNull(),
  price: integer("price").notNull(),
});
