import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  clerkId: text("clerk_id").notNull().unique(),
  email: text("email").notNull().unique(),
  isMerchant: boolean("is_merchant").default(false),
  username: text("username").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});