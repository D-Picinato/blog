import { cache } from '@/services/cache';

export default function clearCacheByKeys(cacheKey: string) {
  for (const key in cache.keys()) {
    if (key.startsWith(cacheKey)) cache.delete(key);
  }
}
