import axios from 'axios';
import ResponseFormat from '@/utils/classes/response-format';
import { CreateUserApiSchemaType } from '@/schemas/api/user/create';
import { User } from '@prisma/client';
import { LoginApiSchemaType } from '@/schemas/api/user/login';

const axiosConfig = axios.create({
  baseURL: '/api',
  validateStatus: () => true,
});

/** Constrói e tipa a requisição */
function request<Params = undefined, Response = undefined>(
  method: 'get' | 'post' | 'patch' | 'put' | 'delete',
  url: string,
  options?: { token?: string; extendsPath?: string }
) {
  return async (params?: Params) => {
    try {
      return (
        await axiosConfig.request({
          url: url + (options?.extendsPath ? `/${options?.extendsPath}` : ''),
          method,
          headers: { Authorization: `Bearer ${options?.token}` },
          ...(method == 'get' || method == 'delete'
            ? { params: params }
            : { data: params }),
        })
      ).data as ResponseFormat<Response>;
    } catch (error) {
      console.error(`Erro na requisição para: ${url}`, error);
      return new ResponseFormat<undefined>(503, 'Servidor indisponível!');
    }
  };
}

/** Client tipado e estruturado das requisições */
export const api = {
  user: {
    create: request<CreateUserApiSchemaType, Omit<User, 'password'>>(
      'post',
      '/user/create'
    ),
    login: request<LoginApiSchemaType, Omit<User, 'password'>>(
      'post',
      '/user/login'
    ),
    me: request<undefined, Omit<User, 'password'>>('get', '/user/me'),
  },
};
