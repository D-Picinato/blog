import axios from 'axios';
import { useEffect } from 'react';

import ResponseFormat from '@/classes/response-format';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
        await api.request({
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

/** Hook para requisições usando Axios */
export default function useApi() {
  const { removeToken } = useAdmStore();

  useEffect(() => {
    const responseInterceptor = api.interceptors.response.use((response) => {
      if (response.status == 401) {
        removeToken();
        console.log(response);
      }
      return response;
    });

    return () => api.interceptors.response.eject(responseInterceptor);
  }, []);

  return {
    adm: {
      sendTokenEmail: request('post', '/adm/sendtokeninemail'),

      invalidateToken: (token: string) =>
        request('post', '/adm/invalidatetoken', { token }),

      validateToken: (token: string) =>
        request('post', '/adm/validatetoken', { token }),
    },
    platform: {
      newPlatform: (token: string) =>
        request<AddPlatformParams>('post', '/platform', { token }),

      listPlatform: (token: string) =>
        request<ListPlatformParams, ListPlatformReturn>('get', '/platform', {
          token,
        }),

      editPlatform: (token: string, institutionID: string) =>
        request<EditPlatformParams>('patch', '/platform', {
          token,
          extendsPath: institutionID,
        }),

      deletePlatform: (token: string, institutionID: string) =>
        request('delete', '/platform', { token, extendsPath: institutionID }),
    },
  };
}