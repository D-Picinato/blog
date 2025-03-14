import Toast from '@/components/ui/toast';
import { LoginFormSchemaType } from '@/schemas/forms/login';
import { RegisterFormSchemaType } from '@/schemas/forms/register';
import { api } from '@/services/api';
import { useUserStore } from '@/stores/use-user-store';
import requestErrorHandler from '@/utils/functions/request-error-handler';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export function useUser() {
  const store = useUserStore();
  const [loading, setLoading] = useState<boolean>();

  // Recupera os dados do usuário
  useEffect(() => {
    if (store.user) {
      setLoading(true);
      api.user
        .me()
        .then((response) => {
          if (!response.success || !response.data)
            return requestErrorHandler(response);
          store.setUser(response.data);
        })
        .catch(() => requestErrorHandler())
        .finally(() => setLoading(false));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /** Faz login */
  const login = (data: LoginFormSchemaType) => {
    setLoading(true);
    api.user
      .login(data)
      .then((response) => {
        if (!response.success || !response.data)
          return requestErrorHandler(response);
        toast.custom(<Toast variant="success">{response.message}</Toast>);
        store.setUser(response.data);
      })
      .catch(() => requestErrorHandler())
      .finally(() => setLoading(false));
  };

  /** Cadastra usuário */
  const register = (data: RegisterFormSchemaType) => {
    setLoading(true);
    api.user
      .create(data)
      .then((response) => {
        if (!response.success || !response.data)
          return requestErrorHandler(response);
        toast.custom(<Toast variant="success">{response.message}</Toast>);
        store.setUser(response.data);
      })
      .catch(() => requestErrorHandler())
      .finally(() => setLoading(false));
  };

  /** Faz logout */
  const logout = () => {
    setLoading(true);
    api.user
      .logout()
      .then((response) => {
        if (!response.success) return requestErrorHandler(response);
        store.removeUser();
      })
      .catch(() => requestErrorHandler())
      .finally(() => setLoading(false));
  };

  return { loading, login, register, logout, ...store };
}
