import { doublePrecision, pgTable, serial, text } from "drizzle-orm/pg-core";

export const LocationTable = pgTable("locations", {
  id: serial("id").primaryKey(),
  name: text("name"),
  lat: doublePrecision("lat").notNull(),
  lng: doublePrecision("lng").notNull(),
});
