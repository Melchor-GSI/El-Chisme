import { serial, pgTable, text, foreignKey, integer, AnyPgColumn } from "drizzle-orm/pg-core"

export const location = pgTable("location", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    coordinates: text("coordinates").notNull(),
  });