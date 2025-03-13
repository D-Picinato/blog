'use client';

import Input from '@/components/ui/input';
import {
  registerFormSchema,
  RegisterFormSchemaType,
} from '@/schemas/forms/register';
import { api } from '@/services/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  HiOutlineArrowRightEndOnRectangle,
  HiOutlineUser,
} from 'react-icons/hi2';
import Button from '../ui/button';
import { useCustomModal } from '@/stores/use-custom-modal';
import toast from 'react-hot-toast';
import Toast from '../ui/toast';
import requestErrorHandler from '@/utils/functions/request-error-handler';
import { useEffect, useState } from 'react';

export default function RegisterModal() {
  const { removeModal } = useCustomModal();
  const [loading, setLoading] = useState<boolean>();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(registerFormSchema),
  });

  const [password, passwordConfirmation] = watch([
    'password',
    'passwordConfirmation',
  ]);

  useEffect(() => {
    if (password != passwordConfirmation)
      return setError('passwordConfirmation', {
        message: 'A senha está diferente',
      });
    clearErrors('passwordConfirmation');
  }, [passwordConfirmation]);

  const onSubmit = (data: RegisterFormSchemaType) => {
    setLoading(true);
    api.user
      .create(data)
      .then((response) => {
        if (!response.success) return requestErrorHandler(response);

        toast.custom(<Toast variant="success">{response.message}</Toast>);

        removeModal();
      })
      .catch(() => requestErrorHandler())
      .finally(() => setLoading(false));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8"
      autoComplete="off"
    >
      <div>
        <h1>Cadastro</h1>
        <p className="text-gray-500">
          Insira seu nome de usuário e senha para acessar sua conta.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Input
          autoFocus
          id="name"
          label="Nome"
          placeholder="Insira seu nome"
          type="text"
          icon={<HiOutlineUser />}
          errorMessage={errors.name?.message}
          {...register('name')}
        ></Input>
        <Input
          id="password"
          label="Senha"
          placeholder="Insira sua senha"
          type="password"
          errorMessage={errors.password?.message}
          {...register('password')}
        ></Input>
        <Input
          id="passwordConfirmation"
          label="Confirmação de Senha"
          placeholder="Insira sua senha novamente"
          type="password"
          errorMessage={errors.passwordConfirmation?.message}
          {...register('passwordConfirmation')}
        ></Input>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="clean" type="button" onClick={removeModal}>
          Cancelar
        </Button>
        <Button
          variant="solid"
          loading={loading}
          icon={<HiOutlineArrowRightEndOnRectangle />}
        >
          Entrar
        </Button>
      </div>
    </form>
  );
}
