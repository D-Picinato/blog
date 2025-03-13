import { LRUCache } from 'lru-cache';

export const cache = new LRUCache({
  max: 100,
  ttl: 1000 * 60 * 5,
});
