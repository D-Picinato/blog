import { prisma } from '@/services/prisma';
import ResponseFormat from '@/utils/classes/response-format';
import catchErrorHandler from '@/utils/functions/catch-error-handler';
import validateSchema from '@/utils/functions/validate-schema';
import getReqBody from '@/utils/functions/get-req-body';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { cookieOptions } from '@/constants/cookie-options';
import bcrypt from 'bcryptjs';
import { loginApiSchema, LoginApiSchemaType } from '@/schemas/api/user/login';

/** Login */
export async function POST(req: Request) {
  try {
    const reqData = await getReqBody<LoginApiSchemaType>(req);

    const { errors } = validateSchema(loginApiSchema, reqData);
    if (errors)
      return new ResponseFormat(400, 'Credenciais inválidas!', errors).res();

    const user = await prisma.user.findUnique({
      where: { name: reqData.name },
    });

    if (!user)
      return new ResponseFormat(401, 'Usuário e/ou senha incorretos!').res();

    const valid = bcrypt.compare(reqData.password, user.password);

    if (!valid)
      return new ResponseFormat(401, 'Usuário e/ou senha incorretos!').res();

    const userWithoutPassword = { ...user, password: undefined };

    const token = jwt.sign(userWithoutPassword, process.env.JWT_SECRET_KEY!, {
      expiresIn: '7d',
    });

    (await cookies()).set('token', token, cookieOptions);

    return new ResponseFormat(
      200,
      'Login realizado com sucesso!',
      userWithoutPassword
    ).res();
  } catch (error) {
    return catchErrorHandler(error, { messageP2025: '' }).res();
  }
}
