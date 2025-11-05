import { env } from '@/env.mjs';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

// Mock client that does nothing
const mockClient = {
    execute: async () => ({ columns: [], rows: [] }),
    batch: async () => [],
    transaction: async () => ({}),
    sync: async () => {},
    close: () => {},
    closed: true,
};

const client = env.DATABASE_URL
    ? createClient({
          url: env.DATABASE_URL,
          authToken: env.DATABASE_AUTH_TOKEN,
      })
    : (mockClient as any);

export const db = drizzle(client, { schema, logger: process.env.NODE_ENV === 'development' });
