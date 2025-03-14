'use client';

import LoginModal from '@/components/forms/login';
import RegisterModal from '@/components/forms/register';
import Button from '@/components/ui/button';
import { useUser } from '@/hooks/use-user';
import { useCustomModalStore } from '@/stores/use-custom-modal-store';
import {
  HiOutlineArrowLeftStartOnRectangle,
  HiOutlineArrowRightEndOnRectangle,
  HiOutlineCog6Tooth,
  HiOutlinePlus,
  HiOutlineUserPlus,
} from 'react-icons/hi2';

export default function UserMenu() {
  const { user, logout } = useUser();
  const { createModal } = useCustomModalStore();

  return (
    <div className="flex flex-col gap-1">
      {user ? (
        <>
          <Button variant="solid">
            <span>Post</span>
            <HiOutlinePlus />
          </Button>
          <Button variant="clean">
            <span>Perfil</span>
            <HiOutlineCog6Tooth />
          </Button>
          <Button variant="danger" onClick={logout}>
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
