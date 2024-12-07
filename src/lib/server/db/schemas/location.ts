import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const LocationTable = pgTable("locations", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    coordinates: text("coordinates").notNull(),
  });