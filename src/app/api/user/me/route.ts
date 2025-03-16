import ResponseFormat from '@/utils/classes/response-format';
import catchErrorHandler from '@/utils/functions/catch-error-handler';
import { cookies } from 'next/headers';
import getUserFromCookies from '@/utils/functions/get-user-from-cookies';
import { UserType } from '@/@types/user';

export type UserMeResponseType = UserType;

/** Recupera os dados do usuário autenticado */
export async function GET() {
  try {
    // Recupera o usuário autenticado
    const { user, errorResponse } = await getUserFromCookies(cookies);
    if (errorResponse) return errorResponse;

    // Retorna o usuário
    return new ResponseFormat<UserMeResponseType>(
      200,
      'Sessão válida',
      user
    ).res();
  } catch (error) {
    return catchErrorHandler(error);
  }
}
