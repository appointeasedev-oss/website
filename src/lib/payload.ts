import { env } from '@/env.mjs';
import { mockEnv } from '@/lib/mock-data';

export const payloadURL = env.NEXT_PUBLIC_PAYLOAD_URI ?? mockEnv.NEXT_PUBLIC_PAYLOAD_URI;
