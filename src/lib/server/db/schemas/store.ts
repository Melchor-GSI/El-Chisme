import { serial, pgTable, text, foreignKey, integer, AnyPgColumn, timestamp, boolean } from "drizzle-orm/pg-core"
import {usersTable} from "./user"
import { location } from "./location"

export const store = pgTable("store", {
    id: serial("store_id").primaryKey(),
    name: text("name").notNull(),
    contact_information: text("phone"),
    shipping_options: boolean("shipping_options").default(false),
    opening_hours: timestamp("opening_hours"),
    owner: integer("owner").references((): AnyPgColumn => usersTable.id),
    location_id: integer("location_id").references((): AnyPgColumn => location.id)
})