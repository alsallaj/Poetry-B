import { pgTable, serial, text, boolean, real } from "drizzle-orm/pg-core";

export const tutors = pgTable("tutors", {
  id: serial("id").primaryKey(),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en").notNull(),
  accentAr: text("accent_ar").notNull().default(""),
  descriptionEn: text("description_en").notNull().default(""),
  ttsLanguage: text("tts_language").notNull().default("ar-SA"),
  ttsPitch: real("tts_pitch").notNull().default(1.0),
  ttsRate: real("tts_rate").notNull().default(0.9),
  avatarColor: text("avatar_color").notNull().default("#7C3AED"),
  isActive: boolean("is_active").notNull().default(true),
});

export type Tutor = typeof tutors.$inferSelect;
export type InsertTutor = typeof tutors.$inferInsert;
