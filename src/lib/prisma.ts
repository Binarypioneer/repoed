import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool } from "@neondatabase/serverless";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Guard client creation so build-time imports don't try to connect without a URL
let prisma: PrismaClient;

if (process.env.DATABASE_URL) {
  const adapter = new PrismaNeon(
    {
      connectionString: process.env.DATABASE_URL,
    },
    { schema: "public" }
  );

  prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });

  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
} else {
  // Provide a dummy object to satisfy imports during build
  prisma = {} as any;
}

export { prisma };