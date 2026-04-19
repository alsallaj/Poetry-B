import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const stages = pgTable("stages", {
  id: serial("id").primaryKey(),
  order: integer("order").notNull(),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en").notNull(),
  descriptionAr: text("description_ar").notNull(),
  descriptionEn: text("description_en").notNull(),
  icon: text("icon").notNull(),
  levelStart: integer("level_start").notNull(),
  levelEnd: integer("level_end").notNull(),
});

export const insertStageSchema = createInsertSchema(stages).omit({ id: true });
export type Stage = typeof stages.$inferSelect;
export type InsertStage = z.infer<typeof insertStageSchema>;
