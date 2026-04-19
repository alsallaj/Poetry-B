import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { stages } from "./stages";

export const levels = pgTable("levels", {
  id: serial("id").primaryKey(),
  stageId: integer("stage_id")
    .notNull()
    .references(() => stages.id, { onDelete: "cascade" }),
  levelNumber: integer("level_number").notNull().unique(),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en").notNull(),
  skillKey: text("skill_key").notNull(),
  skillDescriptionEn: text("skill_description_en").notNull(),
  roleplaysScenarioAr: text("roleplay_scenario_ar").notNull(),
  roleplaysScenarioEn: text("roleplay_scenario_en").notNull(),
  systemPrompt: text("system_prompt").notNull(),
  xpReward: integer("xp_reward").notNull().default(100),
});

export const insertLevelSchema = createInsertSchema(levels).omit({ id: true });
export type Level = typeof levels.$inferSelect;
export type InsertLevel = z.infer<typeof insertLevelSchema>;
