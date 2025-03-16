import deletePost from '@/db/post/delete';
import getPost from '@/db/post/get';
import ResponseFormat from '@/utils/classes/response-format';
import catchErrorHandler from '@/utils/functions/catch-error-handler';
import getUserFromCookies from '@/utils/functions/get-user-from-cookies';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export type PostDeleteResponseType = Awaited<ReturnType<typeof deletePost>>;

/** Atualiza um post */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Recupera o ID do Post
    const { id } = await params;

    // Recupera o usuário autenticado
    const { user, errorResponse } = await getUserFromCookies(cookies);
    if (errorResponse) return errorResponse;

    // Recupera o post
    const post = await getPost(id);

    // Retorno se o post estiver removido
    if (post.deletedAt) return new ResponseFormat(410, 'Post removido').res();

    // Retorno caso o post não pertença ao usuário
    if (post.userId != user?.id)
      return new ResponseFormat(403, 'Você não pode remover esse post').res();

    // Remove o post
    const deletedPost = await deletePost(id);

    // Retorno de sucesso
    return new ResponseFormat<PostDeleteResponseType>(
      200,
      'Post removido',
      deletedPost
    ).res();
  } catch (error) {
    return catchErrorHandler(error, {
      messageP2025: 'Post não encontrado',
    });
  }
}
