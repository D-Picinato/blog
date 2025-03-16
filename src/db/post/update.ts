import { UpdatePostSchemaType } from '@/schemas/post/update';
import { cache } from '@/services/cache';
import { prisma } from '@/services/prisma';
import clearCacheByKeys from '@/utils/functions/clear-cache-by-keys';

/** Atualiza um Post */
export default async function updatePost(
  id: string,
  data: UpdatePostSchemaType
): Promise<
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
  // Atualiza o Post
  const post = await prisma.post.update({
    where: { id },
    data: data,
    include: { user: { omit: { password: true } } },
  });

  // Salva o post no cache
  cache.set(`@post:${id}`, post);

  // Limpa o cache da listagem de posts
  clearCacheByKeys('@posts');

  return post;
}
