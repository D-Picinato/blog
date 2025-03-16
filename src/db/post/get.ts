import { cache } from '@/services/cache';
import { prisma } from '@/services/prisma';

/** Recupera um Post */
export default async function getPost(id: string): Promise<
  {
    user: {
      id: string;
      name: string;
      createdAt: Date;
      updatedAt: Date;
      deletedAt: Date | null;
    };
  } & {
    id: string;
    name: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }
> {
  // Recupera o post cacheado
  const cachedResponse = cache.get(`@post:${id}`);

  // Retorno caso o post estiver cacheado
  if (cachedResponse) return cachedResponse as typeof post;

  // Recupera o Post no banco de dados
  const post = await prisma.post.findUniqueOrThrow({
    where: { id },
    include: { user: { omit: { password: true } } },
  });

  // Salva o post no cache
  cache.set(`@post:${id}`, post);

  return post;
}
