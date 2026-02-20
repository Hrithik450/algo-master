import { pgTable, text, integer, timestamp, uuid } from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "@auth/core/adapters";
import { user } from "@/lib/drizzle/schemas/user";

export const account = pgTable("account", {
  userId: uuid("userId")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  type: text("type").$type<AdapterAccountType>().notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("providerAccountId").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
});

export const session = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: uuid("userId")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});
