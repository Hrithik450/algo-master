import {
  pgTable,
  text,
  integer,
  timestamp,
  real,
  uuid,
  index,
  boolean,
} from "drizzle-orm/pg-core";
import { user } from "@/lib/drizzle/schemas/user";
import { problems, topics } from "@/lib/drizzle/schemas/learning";
import { relations } from "drizzle-orm";

export const userProgress = pgTable(
  "user_progress",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .references(() => user.id, { onDelete: "cascade" })
      .notNull(), // Assuming you have a separate Auth table
    problemId: uuid("problem_id").references(() => problems.id, {
      onDelete: "cascade",
    }),
    topicId: uuid("topic_id").references(() => topics.id, {
      onDelete: "cascade",
    }), // Denormalized for faster weighting

    // Logic Metrics
    successRate: real("success_rate").default(0).notNull(), // 0 to 1
    revisionCount: integer("revision_count").default(0).notNull(),

    // Timestamps for the Weighted Scoring
    dateSolved: timestamp("date_solved").notNull().defaultNow(), // First solved
    lastRevisedAt: timestamp("last_revised_at").notNull().defaultNow(),

    // Status for the "Availability Boolean" (Filter out mastered problems if desired)
    status: text("status").default("learning").notNull(), // 'learning', 'mastered', 'archived'
  },
  (table) => ({
    userTopicIdx: index("user_topic_idx").on(table.userId, table.topicId),
    recencyIdx: index("recency_idx").on(table.lastRevisedAt),
  })
);

export const revisionLogs = pgTable(
  "revision_logs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .references(() => user.id, { onDelete: "cascade" })
      .notNull(),
    problemId: uuid("problem_id").references(() => problems.id, {
      onDelete: "cascade",
    }),
    topicId: uuid("topic_id").references(() => topics.id, {
      onDelete: "cascade",
    }),
    revisedAt: timestamp("revised_at").defaultNow().notNull(),
    isSuccess: boolean("is_success").notNull(), // currentResult (1 or 0)
    timeTaken: integer("time_taken"), // optional: in seconds
  },
  (table) => ({
    usageIdx: index("usage_idx").on(
      table.userId,
      table.topicId,
      table.revisedAt
    ),
  })
);

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  problem: one(problems, {
    fields: [userProgress.problemId],
    references: [problems.id],
  }),
  topic: one(topics, {
    fields: [userProgress.topicId],
    references: [topics.id],
  }),
}));
