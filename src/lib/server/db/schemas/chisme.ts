import { serial, pgTable, text, integer, AnyPgColumn, timestamp } from "drizzle-orm/pg-core"
import { productsTable } from "./product";
import { location } from "./location";
import { store } from "./store";


export const chisme = pgTable("chisme", {
    id: serial("id").primaryKey(),
    product_id: integer("product_id").references((): AnyPgColumn => productsTable.id).notNull(),
    location: integer("location").references((): AnyPgColumn => location.id),
    store_id: integer("store_id").references((): AnyPgColumn => store.id),
    created_date: timestamp("created_date").defaultNow().notNull(),
    end_date: timestamp("end_date").notNull()
  });