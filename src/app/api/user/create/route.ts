import { prisma } from '@/services/prisma';
import ResponseFormat from '@/utils/classes/response-format';
import catchErrorHandler from '@/utils/functions/catch-error-handler';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { cookieOptions } from '@/constants/cookie-options';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';
import { createUserSchema } from '@/schemas/user/create';
import { UserType } from '@/@types/user';
import getAndValidateBody from '@/utils/functions/get-and-validate-body';

export type UserCreateResponseType = UserType;

/** Cadastra um usuário */
export async function POST(req: NextRequest) {
  try {
    // Recupera o payload e valida o esquema
    const { reqData, validateErrorResponse } = await getAndValidateBody(
      req,
      createUserSchema
    );
    if (validateErrorResponse) return validateErrorResponse;

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(reqData.password, 10);

    // Cria o usuário
    const user = await prisma.user.create({
      data: { name: reqData.name, password: hashedPassword },
      omit: { password: true },
    });

    // Cria o token
    const token = jwt.sign(user, process.env.JWT_SECRET_KEY!, {
      expiresIn: '7d',
    });

    // Armazena o token nos cookies
    (await cookies()).set('token', token, cookieOptions);

    // Retorno de sucesso
    return new ResponseFormat<UserCreateResponseType>(
      200,
      'Usuário cadastrado com sucesso',
      user
    ).res();
  } catch (error) {
    return catchErrorHandler(error, {
      messageP2002: 'Esse nome de usuário já está em uso',
    });
  }
}
