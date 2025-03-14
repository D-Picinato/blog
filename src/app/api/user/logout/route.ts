import ResponseFormat from '@/utils/classes/response-format';
import catchErrorHandler from '@/utils/functions/catch-error-handler';
import { cookies } from 'next/headers';

/** Recupera os dados do usuário autenticado */
export async function DELETE() {
  try {
    (await cookies()).delete('token');

    return new ResponseFormat(200, 'Sessão finalizada!').res();
  } catch (error) {
    return catchErrorHandler(error).res();
  }
}
