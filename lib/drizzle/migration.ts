import "dotenv/config";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not configured in environment variables");
}

const migratorClient = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 1,
});

async function main() {
  await migrate(drizzle(migratorClient), {
    migrationsFolder: "./lib/drizzle/migrations",
  });

  migratorClient.end();
}

main();
