# Teleport - Proxy Booking Platform

## Overview

Teleport is a marketplace web application that connects users with local "proxies" (human representatives) in various locations around the world. Users can browse available proxies on an interactive map, view their profiles with ratings and specialties, and book live teleportation sessions. The platform enables real-time virtual presence through proxy connections.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style)
- **Animations**: Framer Motion for smooth transitions
- **Maps**: Leaflet with react-leaflet for interactive world map
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful endpoints defined in `shared/routes.ts` with Zod validation
- **Authentication**: Replit Auth (OpenID Connect) with session-based authentication
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Migrations**: Drizzle Kit with `db:push` command for schema sync
- **Validation**: Drizzle-Zod for automatic schema-to-validation generation

### Project Structure
```
├── client/           # React frontend
│   └── src/
│       ├── components/   # UI components (shadcn/ui + custom)
│       ├── hooks/        # React Query hooks for API calls
│       ├── pages/        # Route components
│       └── lib/          # Utilities and query client
├── server/           # Express backend
│   ├── routes.ts     # API route handlers
│   ├── storage.ts    # Database operations
│   └── replit_integrations/auth/  # Replit Auth setup
├── shared/           # Shared code between client/server
│   ├── schema.ts     # Drizzle database schema
│   ├── routes.ts     # API contract definitions
│   └── models/       # Auth-related models
└── migrations/       # Drizzle migration files
```

### Key Design Patterns
- **Shared Type Safety**: API contracts defined in `shared/routes.ts` with Zod schemas ensure type safety between frontend and backend
- **Storage Abstraction**: `IStorage` interface in `server/storage.ts` abstracts database operations
- **Component-First UI**: shadcn/ui components provide consistent, accessible UI primitives
- **Query-Based Data Fetching**: Custom hooks in `client/src/hooks/` wrap React Query for clean API consumption

## External Dependencies

### Database
- **PostgreSQL**: Primary database accessed via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries with automatic migrations

### Authentication
- **Replit Auth**: OpenID Connect integration for user authentication
- **Session Management**: PostgreSQL-backed sessions with 1-week TTL
- Required environment variables: `ISSUER_URL`, `REPL_ID`, `SESSION_SECRET`, `DATABASE_URL`

### Frontend Libraries
- **Leaflet**: Interactive maps with custom markers for proxy locations
- **Radix UI**: Accessible component primitives (via shadcn/ui)
- **Embla Carousel**: Touch-friendly carousel component

### Build & Development
- **Vite**: Frontend build tool with HMR
- **esbuild**: Server bundling for production
- **TSX**: TypeScript execution for development