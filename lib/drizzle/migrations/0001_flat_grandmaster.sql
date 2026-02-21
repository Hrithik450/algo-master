CREATE TABLE "problems" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"topic_id" uuid,
	"title" text NOT NULL,
	"difficulty" text NOT NULL,
	"external_url" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "topics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text,
	CONSTRAINT "topics_name_unique" UNIQUE("name"),
	CONSTRAINT "topics_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "revision_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"problem_id" uuid,
	"topic_id" uuid,
	"revised_at" timestamp DEFAULT now() NOT NULL,
	"is_success" boolean NOT NULL,
	"time_taken" integer
);
--> statement-breakpoint
CREATE TABLE "user_progress" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"problem_id" uuid,
	"topic_id" uuid,
	"success_rate" real DEFAULT 0 NOT NULL,
	"revision_count" integer DEFAULT 0 NOT NULL,
	"date_solved" timestamp DEFAULT now() NOT NULL,
	"last_revised_at" timestamp DEFAULT now() NOT NULL,
	"status" text DEFAULT 'learning' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "problems" ADD CONSTRAINT "problems_topic_id_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."topics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "revision_logs" ADD CONSTRAINT "revision_logs_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "revision_logs" ADD CONSTRAINT "revision_logs_problem_id_problems_id_fk" FOREIGN KEY ("problem_id") REFERENCES "public"."problems"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "revision_logs" ADD CONSTRAINT "revision_logs_topic_id_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."topics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_problem_id_problems_id_fk" FOREIGN KEY ("problem_id") REFERENCES "public"."problems"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_topic_id_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."topics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "topic_idx" ON "problems" USING btree ("topic_id");--> statement-breakpoint
CREATE UNIQUE INDEX "name_idx" ON "topics" USING btree ("name");--> statement-breakpoint
CREATE INDEX "usage_idx" ON "revision_logs" USING btree ("user_id","topic_id","revised_at");--> statement-breakpoint
CREATE INDEX "user_topic_idx" ON "user_progress" USING btree ("user_id","topic_id");--> statement-breakpoint
CREATE INDEX "recency_idx" ON "user_progress" USING btree ("last_revised_at");