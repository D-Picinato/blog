import getPost from '@/db/post/get';
import ResponseFormat from '@/utils/classes/response-format';
import catchErrorHandler from '@/utils/functions/catch-error-handler';
import { NextRequest } from 'next/server';

export type PostGetResponseType = Awaited<ReturnType<typeof getPost>>;

/** Acessa um post */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Recupera o ID do Post
    const { id } = await params;

    // Recupera o post
    const post = await getPost(id);

    // Retorno caso o post tenha sido removido
    if (post.deletedAt)
      return new ResponseFormat<PostGetResponseType>(
        210,
        'Post removido'
      ).res();

    // Retorno de sucesso
    return new ResponseFormat<PostGetResponseType>(
      200,
      'Post encontrado',
      post
    ).res();
  } catch (error) {
    return catchErrorHandler(error, {
      messageP2025: 'Post não encontrado',
    });
  }
}
