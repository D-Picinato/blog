import ResponseFormat from '@/classes/response-format';
import catchErrorHandler from '@/utils/functions/catch-error-handler';
import { cookies } from 'next/headers';
import verifyJWT from '@/utils/functions/verify-jwt';
import { User } from '@prisma/client';

/** Get User Data */
export async function GET() {
  try {
    const tokenCookie = (await cookies()).get('token');

    if (!tokenCookie) return new ResponseFormat(401, 'Sessão inválida!');

    const { decoded, sessionExpired } = verifyJWT<Omit<User, 'password'>>(
      tokenCookie.value
    );

    if (sessionExpired) return new ResponseFormat(401, 'Sessão expirada!');

    if (!decoded) return new ResponseFormat(401, 'Sessão inválida!');

    return new ResponseFormat(200, 'Sessão válida!', decoded).res();
  } catch (error) {
    return catchErrorHandler(error, { messageP2025: '' }).res();
  }
}
