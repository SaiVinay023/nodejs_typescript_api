import { Request, Response, NextFunction, RequestHandler } from 'express';
import redisClient from '../cache/redisClient';

export const rateLimiter: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const ip = req.ip;
    const key = `rate-limit:${ip}`;
    const requests = await redisClient.incr(key);

    if (requests === 1) {
      await redisClient.expire(key, 60); // 1 minute window
    }

    if (requests > 100) {
      res.status(429).json({ error: 'Too many requests' });
      return; // Explicitly return to avoid further execution
    }

    next(); // Pass control to the next middleware
  } catch (error) {
    console.error('Rate limiter error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    return; // Explicitly return to satisfy TypeScript
  }
};