import ResponseFormat from '@/utils/classes/response-format';
import catchErrorHandler from '@/utils/functions/catch-error-handler';
import { cookies } from 'next/headers';

export type UserLogoutResponseType = undefined;

/** Recupera os dados do usuário autenticado */
export async function DELETE() {
  try {
    // Deleta o token dos cookies
    (await cookies()).delete('token');

    // Retorno de sucesso
    return new ResponseFormat<UserLogoutResponseType>(
      200,
      'Sessão finalizada'
    ).res();
  } catch (error) {
    return catchErrorHandler(error);
  }
}
