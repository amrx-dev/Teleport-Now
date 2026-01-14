import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated, registerAuthRoutes } from "./replit_integrations/auth";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup Replit Auth
  await setupAuth(app);
  registerAuthRoutes(app);

  app.get(api.proxies.list.path, async (req, res) => {
    const proxies = await storage.getProxies();
    res.json(proxies);
  });

  app.get(api.proxies.get.path, async (req, res) => {
    const proxy = await storage.getProxy(Number(req.params.id));
    if (!proxy) {
      return res.status(404).json({ message: "Proxy not found" });
    }
    res.json(proxy);
  });

  app.post(api.bookings.create.path, isAuthenticated, async (req, res) => {
    try {
      const input = api.bookings.create.input.parse(req.body);
      const userId = (req.user as any).claims.sub;
      const booking = await storage.createBooking({ ...input, userId });
      res.status(201).json(booking);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.bookings.list.path, isAuthenticated, async (req, res) => {
      const userId = (req.user as any).claims.sub;
      const bookings = await storage.getBookingsByUser(userId);
      res.json(bookings);
  });

  app.get(api.messages.list.path, isAuthenticated, async (req, res) => {
    const proxyId = Number(req.params.proxyId);
    const userId = (req.user as any).claims.sub;
    const chatHistory = await storage.getMessages(proxyId, userId);
    res.json(chatHistory);
  });

  app.post(api.messages.send.path, isAuthenticated, async (req, res) => {
    try {
      const input = api.messages.send.input.parse(req.body);
      const userId = (req.user as any).claims.sub;
      const message = await storage.createMessage({
        ...input,
        userId,
      });
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed data function
  async function seedDatabase() {
    const existingProxies = await storage.getProxies();
    if (existingProxies.length === 0) {
      const sampleProxies = [
        {
          name: "Sarah Jenkins",
          location: "New York, USA",
          latitude: 40.7128,
          longitude: -74.0060,
          rating: 4.9,
          specialties: ["Real Estate Inspection", "Event Tour"],
          description: "Experienced local guide and property inspector. I can show you apartments or take you to the best hidden gems in NYC.",
          imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          isAvailable: true
        },
        {
          name: "Hiroshi Tanaka",
          location: "Tokyo, Japan",
          latitude: 35.6762,
          longitude: 139.6503,
          rating: 5.0,
          specialties: ["Live Shopping", "Tech Tour"],
          description: "Akihabara expert and shopping assistant. Let's find exactly what you're looking for in Tokyo.",
          imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          isAvailable: true
        },
        {
          name: "Amira Ahmed",
          location: "Dubai, UAE",
          latitude: 25.2048,
          longitude: 55.2708,
          rating: 4.8,
          specialties: ["Luxury Real Estate", "Shopping"],
          description: "Specializing in luxury property viewings and high-end shopping experiences in Dubai Mall.",
          imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          isAvailable: true
        },
        {
          name: "James Wilson",
          location: "London, UK",
          latitude: 51.5074,
          longitude: -0.1278,
          rating: 4.7,
          specialties: ["History Tour", "Pub Crawl"],
          description: "History buff and local Londoner. I can take you on a personalized tour of the historic sites.",
          imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          isAvailable: true
        },
        {
          name: "Fahad Al-Saud",
          location: "Riyadh, Saudi Arabia",
          latitude: 24.7136,
          longitude: 46.6753,
          rating: 4.9,
          specialties: ["Business Scouting", "Cultural Tour"],
          description: "Professional proxy for business meetings and cultural insights in Riyadh.",
          imageUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          isAvailable: true
        }
      ];

      for (const proxy of sampleProxies) {
        await storage.createProxy(proxy);
      }
      console.log("Database seeded with sample proxies");
    }
  }

  // Run seeding
  seedDatabase();

  return httpServer;
}
