import createPost from '@/db/post/create';
import { createPostSchema } from '@/schemas/post/create';
import ResponseFormat from '@/utils/classes/response-format';
import catchErrorHandler from '@/utils/functions/catch-error-handler';
import getAndValidateBody from '@/utils/functions/get-and-validate-body';
import getUserFromCookies from '@/utils/functions/get-user-from-cookies';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export type PostCreateResponseType = Awaited<ReturnType<typeof createPost>>;

/** Cria um post */
export async function POST(req: NextRequest) {
  try {
    // Recupera o usuário autenticado
    const { user, errorResponse } = await getUserFromCookies(cookies);
    if (errorResponse) return errorResponse;

    // Recupera os parâmetros e valida o esquema
    const { reqData, validateErrorResponse } = await getAndValidateBody(
      req,
      createPostSchema
    );
    if (validateErrorResponse) return validateErrorResponse;

    // Retorno caso houver erro na validação
    if (errorResponse) return errorResponse;

    // Cria o Post
    const post = await createPost(user.id, reqData);

    // Retorno de sucesso
    return new ResponseFormat<PostCreateResponseType>(
      200,
      'Post criado',
      post
    ).res();
  } catch (error) {
    return catchErrorHandler(error);
  }
}
