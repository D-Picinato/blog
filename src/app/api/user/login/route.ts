import { prisma } from '@/services/prisma';
import ResponseFormat from '@/utils/classes/response-format';
import catchErrorHandler from '@/utils/functions/catch-error-handler';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { cookieOptions } from '@/constants/cookie-options';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';
import { loginSchema } from '@/schemas/user/login';
import { UserType } from '@/@types/user';
import getAndValidateBody from '@/utils/functions/get-and-validate-body';

export type UserLoginResponseType = UserType;

/** Login */
export async function POST(req: NextRequest) {
  try {
    // Recupera o payload e valida o esquema
    const { reqData, validateErrorResponse } = await getAndValidateBody(
      req,
      loginSchema
    );
    if (validateErrorResponse) return validateErrorResponse;

    // Recupera o usuário no banco
    const user = await prisma.user.findUnique({
      where: { name: reqData.name },
    });

    // Retorno caso o usuário não exista
    if (!user)
      return new ResponseFormat(401, 'Usuário e/ou senha incorretos').res();

    // Valida a senha
    const valid = bcrypt.compare(reqData.password, user.password);

    // Retorno caso a senha esteja incorreta
    if (!valid)
      return new ResponseFormat(401, 'Usuário e/ou senha incorretos').res();

    // Passa o usuário sem a senha
    const userWithoutPassword = { ...user, password: undefined };

    // Cria um token para a sessão do usuário
    const token = jwt.sign(userWithoutPassword, process.env.JWT_SECRET_KEY!, {
      expiresIn: '7d',
    });

    // Armazena o token nos cookies
    (await cookies()).set('token', token, cookieOptions);

    // Retorno de sucesso
    return new ResponseFormat<UserLoginResponseType>(
      200,
      'Login realizado com sucesso',
      userWithoutPassword
    ).res();
  } catch (error) {
    return catchErrorHandler(error, { messageP2025: '' });
  }
}
