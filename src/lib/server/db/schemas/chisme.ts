import {
  AnyPgColumn,
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
  location: integer("location").references((): AnyPgColumn => LocationTable.id),
  storeId: integer("store_id").references((): AnyPgColumn => StoreTable.id),
  created_date: timestamp("created_date").defaultNow().notNull(),
  end_date: timestamp("end_date").notNull(),
});
