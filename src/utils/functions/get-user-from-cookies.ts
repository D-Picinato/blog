import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import verifyJWT from './verify-jwt';
import { UserType } from '@/@types/user';
import ResponseFormat from '../classes/response-format';
import { NextResponse } from 'next/server';

class FnResponse {
  constructor(
    public user: UserType,
    public errorResponse?: NextResponse<ResponseFormat>
  ) {}
}

/** Recupera o usuário do JWT nos cookies */
export default async function getUserFromCookies(
  cookies: () => Promise<ReadonlyRequestCookies>
): Promise<FnResponse> {
  // Recupera o token dos cookies
  const token = (await cookies()).get('token');

  // Retorno caso o não houver token
  if (!token)
    return new FnResponse(
      {} as UserType,
      new ResponseFormat(401, 'Você não está autenticado').res()
    );

  // Recupera os dados do payload do token
  const { decoded, sessionExpired } = verifyJWT<UserType>(token.value);

  // Retorno caso a sessão tiver expirada
  if (!sessionExpired)
    return new FnResponse(
      {} as UserType,
      new ResponseFormat(401, 'Sessão expirada').res()
    );

  // Retorno caso o usuário não existir no token
  if (!decoded)
    return new FnResponse(
      {} as UserType,
      new ResponseFormat(401, 'Sessão inválida').res()
    );

  // Retorna o usuário recuperado
  return new FnResponse(decoded);
}
