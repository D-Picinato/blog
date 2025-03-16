import getPost from '@/db/post/get';
import updatePost from '@/db/post/update';
import { updatePostSchema } from '@/schemas/post/update';
import ResponseFormat from '@/utils/classes/response-format';
import catchErrorHandler from '@/utils/functions/catch-error-handler';
import getAndValidateBody from '@/utils/functions/get-and-validate-body';
import getUserFromCookies from '@/utils/functions/get-user-from-cookies';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export type PostUpdateResponseType = Awaited<ReturnType<typeof updatePost>>;

/** Atualiza um post */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Recupera o ID do Post
    const { id } = await params;

    // Recupera o usuário autenticado
    const { user, errorResponse } = await getUserFromCookies(cookies);
    if (errorResponse) return errorResponse;

    // Recupera os parâmetros e valida o esquema
    const { reqData, validateErrorResponse } = await getAndValidateBody(
      req,
      updatePostSchema
    );
    if (validateErrorResponse) return validateErrorResponse;

    // Recupera o post
    const post = await getPost(id);

    // Retorno caso o post não pertença ao usuário
    if (post.userId != user?.id)
      return new ResponseFormat(403, 'Você não pode atualizar esse post').res();

    // Atualiza o post
    const updatedPost = await updatePost(id, reqData);

    // Retorno de sucesso
    return new ResponseFormat<PostUpdateResponseType>(
      200,
      'Post atualizado',
      updatedPost
    ).res();
  } catch (error) {
    return catchErrorHandler(error, {
      messageP2025: 'Post não encontrado',
    });
  }
}
