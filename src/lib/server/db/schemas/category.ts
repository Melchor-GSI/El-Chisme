import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const CategoriesTable = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
