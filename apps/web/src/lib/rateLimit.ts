import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

// Create Redis client
const redis = new Redis({
    url: process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_URL || '',
    token: process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN || '',
});

// Create a rate limiter
export const readRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(50, '60 s'),
  analytics: true,
  prefix: '@upstash/ratelimit/read',
});

export const writeRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, '60 s'),
  analytics: true,
  prefix: '@upstash/ratelimit/write',
});