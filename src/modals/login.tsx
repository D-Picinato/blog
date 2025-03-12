'use client';

import { loginSchema, LoginSchemaType } from '@/schemas/forms/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

export default function LoginModal() {
  const { mutate } = useMutation({
    mutationFn: (data: LoginSchemaType) =>
      new Promise((resolve) => resolve(data)),
  });

  const { handleSubmit } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchemaType) => {
    mutate(data);
  };

  return <form onSubmit={handleSubmit(onSubmit)}></form>;
}
