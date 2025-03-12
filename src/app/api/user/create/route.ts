import { prisma } from '@/services/prisma';
import ResponseFormat from '@/classes/response-format';
import {
  createUserApiSchema,
  CreateUserApiSchemaType,
} from '@/schemas/api/user/create';
import catchErrorHandler from '@/utils/functions/catch-error-handler';
import validateSchema from '@/utils/functions/validate-schema';
import getReqBody from '@/utils/functions/get-req-body';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { cookieOptions } from '@/constants/cookie-options';
import bcrypt from 'bcryptjs';

/** Cadastra um usuário */
export async function POST(req: Request) {
  try {
    const reqData = await getReqBody<CreateUserApiSchemaType>(req);

    const { errors } = validateSchema(createUserApiSchema, reqData);
    if (errors)
      return new ResponseFormat(400, 'Credenciais inválidas!', errors).res();

    const hashedPassword = await bcrypt.hash(reqData.password, 10);

    const user = await prisma.user.create({
      data: { name: reqData.name, password: hashedPassword },
      omit: { password: true },
    });

    const token = jwt.sign(user, process.env.JWT_SECRET_KEY!, {
      expiresIn: '7d',
    });

    (await cookies()).set('token', token, cookieOptions);

    return new ResponseFormat(
      200,
      'Usuário cadastrado com sucesso!',
      user
    ).res();
  } catch (error) {
    return catchErrorHandler(error, {
      messageP2002: 'Esse nome de usuário já está em uso!',
    }).res();
  }
}
