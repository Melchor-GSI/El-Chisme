import {
  AnyPgColumn,
  doublePrecision,
  integer,
  pgTable,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";
import { LocationTable } from "./location";
import { ProductTable } from "./product";
import { StoreTable } from "./store";

export const ChismeTable = pgTable("chismes", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .references((): AnyPgColumn => ProductTable.id)
    .notNull(),
  price: doublePrecision("price"),
  location: integer("location").references((): AnyPgColumn => LocationTable.id),
  storeId: integer("store_id").references((): AnyPgColumn => StoreTable.id),
  createdDate: timestamp("created_date").defaultNow().notNull(),
  endDate: timestamp("end_date").defaultNow().notNull(),
});
