import ResponseFormat from '@/utils/classes/response-format';
import catchErrorHandler from '@/utils/functions/catch-error-handler';
import { cookies } from 'next/headers';
import verifyJWT from '@/utils/functions/verify-jwt';
import { UserType } from '@/@types/user';

/** Recupera os dados do usuário autenticado */
export async function GET() {
  try {
    const tokenCookie = (await cookies()).get('token');

    if (!tokenCookie) return new ResponseFormat(401, 'Sessão inválida!').res();

    const { decoded, sessionExpired } = verifyJWT<UserType>(tokenCookie.value);

    if (sessionExpired)
      return new ResponseFormat(401, 'Sessão expirada!').res();

    if (!decoded) return new ResponseFormat(401, 'Sessão inválida!').res();

    return new ResponseFormat(200, 'Sessão válida!', decoded).res();
  } catch (error) {
    return catchErrorHandler(error).res();
  }
}
