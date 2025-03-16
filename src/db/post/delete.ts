import { cache } from '@/services/cache';
import { prisma } from '@/services/prisma';
import clearCacheByKeys from '@/utils/functions/clear-cache-by-keys';

/** Deleta um Post */
export default async function deletePost(id: string): Promise<
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
  // Deleta o Post (Apenas altera o campo deletedAt)
  const post = await prisma.post.update({
    where: { id },
    data: { deletedAt: new Date() },
    include: { user: { omit: { password: true } } },
  });

  // Salva o post no cache
  cache.set(`@post:${id}`, post);

  // Limpa o cache da listagem de posts
  clearCacheByKeys('@posts');

  return post;
}
