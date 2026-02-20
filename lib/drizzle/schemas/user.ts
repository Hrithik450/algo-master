import {
  pgTable,
  text,
  timestamp,
  uuid,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const user = pgTable(
  "user",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    name: text("name"),
    email: text("email"),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [uniqueIndex("user_email_unique").on(table.email)]
);
