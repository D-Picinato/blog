import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export const cookieOptions: Partial<ResponseCookie> = {
  path: '/',
  httpOnly: true,
  sameSite: 'strict',
  secure: process.env.NODE_ENV == 'production',
  maxAge: 60 * 60 * 24 * 7,
};
