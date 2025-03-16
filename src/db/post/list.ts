import { ListPostSchemaType } from '@/schemas/post/list';
import { cache } from '@/services/cache';
import { prisma } from '@/services/prisma';
import ResponseList from '@/utils/classes/response-list';
import ResponseMeta from '@/utils/classes/response-meta';
import getDeletedWhereCondition from '@/utils/functions/get-deleted-where-condition';
import getPageValues from '@/utils/functions/get-page-values';

/** Recupera um Post */
export default async function listPosts(data: ListPostSchemaType): Promise<{
  list: ({
    user: {
      id: string;
      name: string;
      createdAt: Date;
      updatedAt: Date;
      deletedAt: Date | null;
    };
  } & {
    userId: string;
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  })[];
  meta: ResponseMeta;
}> {
  // Recupera os posts cacheados
  const cachedResponse = cache.get(`@posts:${JSON.stringify(data)}`);

  // Retorno caso os posts estiverem cacheados
  if (cachedResponse) return cachedResponse as ResponseList<typeof posts>;

  // Recupera os valores da página
  const { page, skip, take } = getPageValues(data.meta);

  // Recupera os Posts no banco de dados
  const [posts, totalRecords] = await prisma.$transaction([
    prisma.post.findMany({
      where: {
        userId: data.userId,
        deletedAt: getDeletedWhereCondition(data.meta.deleted),
      },
      include: { user: { omit: { password: true } } },
      skip,
      take,
    }),
    prisma.post.count({
      where: {
        userId: data.userId,
        deletedAt: getDeletedWhereCondition(data.meta.deleted),
      },
    }),
  ]);

  // Cria a resposta formatada
  const response = new ResponseList(
    posts,
    new ResponseMeta(totalRecords, page, take)
  );

  // Salva o post no cache
  cache.set(`@posts:${JSON.stringify(data)}`, response);

  return response;
}
