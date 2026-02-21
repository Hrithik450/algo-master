import {
  pgTable,
  text,
  timestamp,
  uuid,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { userProgress } from "@/lib/drizzle/schemas/user.stats";

export const topics = pgTable(
  "topics",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull().unique(), // e.g., 'Dynamic Programming'
    slug: text("slug").unique(), // for URL: 'dynamic-programming'
  },
  (table) => ({
    nameIdx: uniqueIndex("name_idx").on(table.name),
  })
);

export const problems = pgTable(
  "problems",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    topicId: uuid("topic_id").references(() => topics.id, {
      onDelete: "cascade",
    }),
    title: text("title").notNull(),
    difficulty: text("difficulty").notNull(), // 'Easy', 'Medium', 'Hard'
    externalUrl: text("external_url"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    topicIdx: index("topic_idx").on(table.topicId),
  })
);

export const topicRelations = relations(topics, ({ many }) => ({
  problems: many(problems),
  userStats: many(userProgress),
}));
