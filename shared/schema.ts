import { pgTable, text, serial, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Export auth models
export * from "./models/auth";

export const proxies = pgTable("proxies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(), // "City, Country"
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  rating: real("rating").notNull(),
  specialties: text("specialties").array().notNull(), // ["Shopping", "Tour"]
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  isAvailable: boolean("is_available").default(true).notNull(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  proxyId: integer("proxy_id").notNull(),
  userId: text("user_id").notNull(),
  startTime: timestamp("start_time").notNull(),
  durationMinutes: integer("duration_minutes").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  proxyId: integer("proxy_id").notNull(),
  userId: text("user_id").notNull(),
  content: text("content").notNull(),
  senderType: text("sender_type").notNull(), // "user" or "proxy"
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProxySchema = createInsertSchema(proxies).omit({ id: true });
export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true, userId: true, status: true, createdAt: true });
export const insertMessageSchema = createInsertSchema(messages).omit({ id: true, createdAt: true });

export type Proxy = typeof proxies.$inferSelect;
export type InsertProxy = z.infer<typeof insertProxySchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
