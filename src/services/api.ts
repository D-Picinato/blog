import axios from 'axios';
import ResponseFormat from '@/utils/classes/response-format';
import { CreateUserSchemaType } from '@/schemas/user/create';
import { LoginSchemaType } from '@/schemas/user/login';
import { CreatePostSchemaType } from '@/schemas/post/create';
import { ListPostSchemaType } from '@/schemas/post/list';
import { UserMeResponseType } from '@/app/api/user/me/route';
import { UserLogoutResponseType } from '@/app/api/user/logout/route';
import { UserLoginResponseType } from '@/app/api/user/login/route';
import { UserCreateResponseType } from '@/app/api/user/create/route';
import { PostCreateResponseType } from '@/app/api/post/create/route';
import { PostGetResponseType } from '@/app/api/post/get/[id]/route';
import { PostListResponseType } from '@/app/api/post/list/route';
import { UpdatePostSchemaType } from '@/schemas/post/update';
import { PostUpdateResponseType } from '@/app/api/post/update/[id]/route';

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
            ? { params: { params: JSON.stringify(params) } }
            : { data: params }),
        })
      ).data as ResponseFormat<Response>;
    } catch (error) {
      console.error(`Erro na requisição para: ${url}`, error);
      return new ResponseFormat<undefined>(503, 'Servidor indisponível');
    }
  };
}

/** Client tipado e estruturado das requisições */
export const api = {
  user: {
    create: request<CreateUserSchemaType, UserCreateResponseType>(
      'post',
      '/user/create'
    ),
    login: request<LoginSchemaType, UserLoginResponseType>(
      'post',
      '/user/login'
    ),
    me: request<undefined, UserMeResponseType>('get', '/user/me'),
    logout: request<undefined, UserLogoutResponseType>(
      'delete',
      '/user/logout'
    ),
  },
  post: {
    create: request<CreatePostSchemaType, PostCreateResponseType>(
      'post',
      '/post/create'
    ),
    get: (id: number) =>
      request<undefined, PostGetResponseType>('get', `/post/get/${id}`),
    list: request<ListPostSchemaType, PostListResponseType>(
      'get',
      '/post/list'
    ),
    update: (id: number) =>
      request<UpdatePostSchemaType, PostUpdateResponseType>(
        'put',
        `/post/update/${id}`
      ),
  },
};
