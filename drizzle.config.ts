import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import "./src/lib/drizzle/envConfig";

export default defineConfig({
  schema: "./src/lib/server/db/schemas",
  out: "./src/lib/server/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
