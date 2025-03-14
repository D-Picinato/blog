'use client';

import Input from '@/components/ui/input';
import {
  registerFormSchema,
  RegisterFormSchemaType,
} from '@/schemas/forms/register';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { HiOutlineUser, HiOutlineUserPlus } from 'react-icons/hi2';
import Button from '../ui/button';
import { useCustomModalStore } from '@/stores/use-custom-modal-store';
import { useEffect } from 'react';
import { useUser } from '@/hooks/use-user';

export default function RegisterModal() {
  const { removeModal } = useCustomModalStore();
  const { register: registerFn, loading } = useUser();

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
    if (passwordConfirmation && password != passwordConfirmation)
      return setError('passwordConfirmation', {
        message: 'A senha está diferente',
      });
    clearErrors('passwordConfirmation');
  }, [passwordConfirmation]);

  return (
    <form
      onSubmit={handleSubmit((v) => {
        registerFn(v);
        removeModal();
      })}
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
        <Button variant="solid" loading={loading} icon={<HiOutlineUserPlus />}>
          Cadastrar
        </Button>
      </div>
    </form>
  );
}
