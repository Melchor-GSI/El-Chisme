import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const productsTable = pgTable("products", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  price: integer("price"),
  categoryId: integer("categoryId"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
