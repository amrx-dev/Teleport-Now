import { db } from "./db";
import {
  proxies,
  bookings,
  messages,
  type Proxy,
  type InsertProxy,
  type Booking,
  type InsertBooking,
  type Message,
  type InsertMessage,
} from "@shared/schema";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  getProxies(): Promise<Proxy[]>;
  getProxy(id: number): Promise<Proxy | undefined>;
  createProxy(proxy: InsertProxy): Promise<Proxy>;
  createBooking(booking: InsertBooking & { userId: string }): Promise<Booking>;
  getBookingsByUser(userId: string): Promise<Booking[]>;
  getMessages(proxyId: number, userId: string): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class DatabaseStorage implements IStorage {
  async getProxies(): Promise<Proxy[]> {
    return await db.select().from(proxies);
  }

  async getProxy(id: number): Promise<Proxy | undefined> {
    const [proxy] = await db.select().from(proxies).where(eq(proxies.id, id));
    return proxy;
  }

  async createProxy(insertProxy: InsertProxy): Promise<Proxy> {
    const [proxy] = await db.insert(proxies).values(insertProxy).returning();
    return proxy;
  }

  async createBooking(booking: InsertBooking & { userId: string }): Promise<Booking> {
    const [newBooking] = await db.insert(bookings).values(booking).returning();
    return newBooking;
  }

  async getBookingsByUser(userId: string): Promise<Booking[]> {
    return await db.select().from(bookings).where(eq(bookings.userId, userId));
  }

  async getMessages(proxyId: number, userId: string): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .where(and(eq(messages.proxyId, proxyId), eq(messages.userId, userId)));
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db.insert(messages).values(message).returning();
    return newMessage;
  }
}

export const storage = new DatabaseStorage();
