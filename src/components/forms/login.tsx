'use client';

import Input from '@/components/ui/input';
import { loginSchema, LoginSchemaType } from '@/schemas/user/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  HiOutlineArrowRightEndOnRectangle,
  HiOutlineUser,
} from 'react-icons/hi2';
import Button from '../ui/button';
import { useCustomModalStore } from '@/stores/use-custom-modal-store';
import { useUser } from '@/hooks/use-user';

export default function LoginModal() {
  const { removeModal } = useCustomModalStore();
  const { login, loading } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form
      onSubmit={handleSubmit((v) => login(v).then(removeModal))}
      className="flex flex-col gap-8"
      autoComplete="off"
    >
      <div>
        <h1>Login</h1>
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
