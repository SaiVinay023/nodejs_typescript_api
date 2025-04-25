import redisClient from './redisClient';

export async function getCache<T>(key: string): Promise<T | null> {
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
}

export async function setCache(key: string, value: any, ttl: number = 60): Promise<void> {
  await redisClient.setEx(key, ttl, JSON.stringify(value));
}