import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/lib/drizzle/schema";
import { Pool } from "pg";

if (!process.env.DATABASE_URL)
  throw new Error(
    "DATABASE_URL is not configured in the environment variables"
  );

const dbClient = new Pool({
  connectionString: process.env.DATABASE_URL,
});
export const db = drizzle(dbClient, { schema });
