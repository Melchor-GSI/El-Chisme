import {
  AnyPgColumn,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { CategoriesTable } from "./category";

export const ProductTable = pgTable("products", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  image: text("image"),
  categoryId: integer("category_id").references(
    (): AnyPgColumn => CategoriesTable.id
  ),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
