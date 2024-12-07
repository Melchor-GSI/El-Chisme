import {
  AnyPgColumn,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { categoriesTable } from "./category";

export const ProductTable = pgTable("products", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price"),
  image: text("image"),
  categoryId: integer("category_id").references(
    (): AnyPgColumn => categoriesTable.id
  ),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
