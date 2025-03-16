import { CreatePostSchemaType } from '@/schemas/post/create';
import { cache } from '@/services/cache';
import { prisma } from '@/services/prisma';
import clearCacheByKeys from '@/utils/functions/clear-cache-by-keys';

/** Cria um Post */
export default async function createPost(
  userId: string,
  data: CreatePostSchemaType
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
  // Cria o Post
  const post = await prisma.post.create({
    data: { userId: userId, ...data },
    include: { user: { omit: { password: true } } },
  });

  // Salva o post no cache
  cache.set(`@post:${post.id}`, post);

  // Limpa o cache da listagem de posts
  clearCacheByKeys('@posts');

  return post;
}
