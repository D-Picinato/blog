import listPosts from '@/db/post/list';
import { listPostSchema } from '@/schemas/post/list';
import ResponseFormat from '@/utils/classes/response-format';
import catchErrorHandler from '@/utils/functions/catch-error-handler';
import getAndValidateQuery from '@/utils/functions/get-and-validate-query';
import { NextRequest } from 'next/server';

export type PostListResponseType = Awaited<ReturnType<typeof listPosts>>;

/** Lista os posts */
export async function GET(req: NextRequest) {
  try {
    // Recupera os parâmetros e valida o esquema
    const { reqData, validateErrorResponse } = await getAndValidateQuery(
      req,
      listPostSchema
    );

    // Retorno caso houver erro na validação
    if (validateErrorResponse) return validateErrorResponse;

    // Recupera os posts
    const posts = await listPosts(reqData);

    // Retorno de sucesso
    return new ResponseFormat<PostListResponseType>(
      200,
      'Posts encontrados',
      posts
    ).res();
  } catch (error) {
    return catchErrorHandler(error);
  }
}
