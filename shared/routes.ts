import { z } from 'zod';
import { insertProxySchema, insertBookingSchema, insertMessageSchema, proxies, bookings, messages } from './schema';

export const api = {
  proxies: {
    list: {
      method: 'GET' as const,
      path: '/api/proxies',
      responses: {
        200: z.array(z.custom<typeof proxies.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/proxies/:id',
      responses: {
        200: z.custom<typeof proxies.$inferSelect>(),
        404: z.object({ message: z.string() }),
      },
    },
  },
  bookings: {
    create: {
      method: 'POST' as const,
      path: '/api/bookings',
      input: insertBookingSchema,
      responses: {
        201: z.custom<typeof bookings.$inferSelect>(),
        400: z.object({ message: z.string() }),
        401: z.object({ message: z.string() }),
      },
    },
    list: {
        method: 'GET' as const,
        path: '/api/bookings',
        responses: {
            200: z.array(z.custom<typeof bookings.$inferSelect>()),
            401: z.object({ message: z.string() }),
        }
    }
  },
  messages: {
    list: {
      method: 'GET' as const,
      path: '/api/messages/:proxyId',
      responses: {
        200: z.array(z.custom<typeof messages.$inferSelect>()),
        401: z.object({ message: z.string() }),
      },
    },
    send: {
      method: 'POST' as const,
      path: '/api/messages',
      input: insertMessageSchema.omit({ userId: true }),
      responses: {
        201: z.custom<typeof messages.$inferSelect>(),
        401: z.object({ message: z.string() }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
