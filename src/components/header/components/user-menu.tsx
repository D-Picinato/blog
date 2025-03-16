'use client';

import LoginModal from '@/components/forms/login';
import RegisterModal from '@/components/forms/register';
import Button from '@/components/ui/button';
import { useUser } from '@/hooks/use-user';
import { useCustomModalStore } from '@/stores/use-custom-modal-store';
import { useRouter } from 'next/navigation';
import {
  HiOutlineArrowLeftStartOnRectangle,
  HiOutlineArrowRightEndOnRectangle,
  HiOutlinePlus,
  HiOutlineUser,
  HiOutlineUserPlus,
} from 'react-icons/hi2';

export default function UserMenu() {
  const { user, logout } = useUser();
  const { createModal } = useCustomModalStore();
  const { push } = useRouter();

  return (
    <div className="flex flex-col gap-1">
      {user ? (
        <>
          <Button variant="solid">
            <span>Post</span>
            <HiOutlinePlus />
          </Button>
          <Button variant="clean" onClick={() => push('/user/me')}>
            <span>Meu Perfil</span>
            <HiOutlineUser />
          </Button>
          <Button variant="clean" onClick={logout}>
            <span>Sair</span>
            <HiOutlineArrowLeftStartOnRectangle />
          </Button>
        </>
      ) : (
        <>
          <Button variant="clean" onClick={() => createModal(<LoginModal />)}>
            <span>Entrar</span>
            <HiOutlineArrowRightEndOnRectangle />
          </Button>
          <Button
            variant="clean"
            onClick={() => createModal(<RegisterModal />)}
          >
            <span>Cadastrar-se</span>
            <HiOutlineUserPlus />
          </Button>
        </>
      )}
    </div>
  );
}
