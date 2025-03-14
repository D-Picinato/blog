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
  const login = async (data: LoginFormSchemaType) => {
    setLoading(true);
    try {
      const response = await api.user.login(data);
      if (!response.success || !response.data)
        return requestErrorHandler(response);
      toast.custom(<Toast variant="success">{response.message}</Toast>);
      store.setUser(response.data);
    } catch {
      requestErrorHandler();
    }
    setLoading(false);
  };

  /** Cadastra usuário */
  const register = async (data: RegisterFormSchemaType) => {
    setLoading(true);
    try {
      const response = await api.user.create(data);
      if (!response.success || !response.data)
        return requestErrorHandler(response);
      toast.custom(<Toast variant="success">{response.message}</Toast>);
      store.setUser(response.data);
    } catch {
      requestErrorHandler();
    }
    setLoading(false);
  };

  /** Faz logout */
  const logout = async () => {
    setLoading(true);
    try {
      const response = await api.user.logout();
      if (!response.success) return requestErrorHandler(response);
      store.removeUser();
    } catch {
      requestErrorHandler();
    }
    setLoading(false);
  };

  return { loading, login, register, logout, ...store };
}
