import {
    AnyPgColumn,
    boolean,
    doublePrecision,
    integer,
    pgTable,
    serial,
    text,
    timestamp
} from "drizzle-orm/pg-core";
import { UserTable } from "./user";

export const StoreTable = pgTable("stores", {
  id: serial("store_id").primaryKey(),
  name: text("name").notNull(),
  contact_information: text("phone"),
  shipping_options: boolean("shipping_options").default(false),
  opening_hours: timestamp("opening_hours"),
  owner: integer("owner").references((): AnyPgColumn => UserTable.id),
  lat: doublePrecision("lat").notNull(),
  long: doublePrecision("long").notNull(),
});
