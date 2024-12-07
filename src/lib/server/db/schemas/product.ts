import { AnyPgColumn, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { categoriesTable } from "./category";

export const productsTable = pgTable("products", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  price: integer("price"),
  categoryId: integer("category_id").references((): AnyPgColumn => categoriesTable.id),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
