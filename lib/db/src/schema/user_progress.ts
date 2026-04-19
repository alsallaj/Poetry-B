import { pgTable, serial, integer, timestamp, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  currentLevel: integer("current_level").notNull().default(1),
  totalXp: integer("total_xp").notNull().default(0),
  completedLevels: text("completed_levels").notNull().default("[]"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({ id: true, createdAt: true, updatedAt: true });
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
