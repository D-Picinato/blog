'use client';

import { useEffect, useRef, useState } from 'react';
import { useUser } from '@/hooks/use-user';
import clsx from 'clsx';
import {
  HiOutlineArrowLeftStartOnRectangle,
  HiOutlineArrowRightEndOnRectangle,
  HiOutlineUser,
  HiOutlineUserPlus,
} from 'react-icons/hi2';
import { useCustomModalStore } from '@/stores/use-custom-modal-store';
import LoginModal from '@/components/forms/login';
import RegisterModal from '@/components/forms/register';
import Button from '@/components/ui/button';
import { AiOutlineLoading } from 'react-icons/ai';

export default function User() {
  const { loading, user, logout } = useUser();
  const [active, setActive] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { createModal } = useCustomModalStore();

  useEffect(() => {
    const handleScreenClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setActive(false);
    };

    if (active) return window.addEventListener('click', handleScreenClick);
    window.removeEventListener('click', handleScreenClick);

    return () => window.removeEventListener('click', handleScreenClick);
  }, [active]);

  return (
    <div className="flex justify-end relative" ref={menuRef}>
      <button
        className="flex items-center gap-2 rounded-lg hover:bg-transparent-light p-2 transition-all duration-100"
        onClick={() => setActive((v) => !v)}
      >
        <div className="w-10 h-10 rounded-lg bg-gray-600 text-xl flex items-center justify-center text-gray-300">
          {loading ? (
            <AiOutlineLoading className="loadingIcon" />
          ) : user ? (
            user.name
              .split(' ')
              .slice(0, 2)
              .map((name) => name[0].toUpperCase())
              .join('')
          ) : (
            <HiOutlineUser />
          )}
        </div>
        <div className="border border-gray-800 h-10"></div>
        <p className="p-2">
          {loading ? 'Carregando...' : user ? user.name : 'Entrar'}
        </p>
      </button>

      <div
        className={clsx(
          'bg-gray-900 border border-gray-800 absolute top-[calc(100%+8px)] p-2 rounded-lg transition-all duration-100 w-max',
          active
            ? 'visible opacity-100 scale-y-100'
            : 'invisible opacity-0 scale-y-0'
        )}
      >
        <div className="flex flex-col">
          {user ? (
            <Button variant="clean" onClick={logout}>
              <span>Sair</span>
              <HiOutlineArrowLeftStartOnRectangle />
            </Button>
          ) : (
            <>
              <button
                className="flex justify-center items-center gap-2 p-2 px-4 hover:bg-gray-800 rounded-lg"
                onClick={() => createModal(<LoginModal />)}
              >
                <span>Entrar</span>
                <HiOutlineArrowRightEndOnRectangle />
              </button>
              <button
                className="flex justify-center items-center gap-2 p-2 px-4 hover:bg-gray-800 rounded-lg"
                onClick={() => createModal(<RegisterModal />)}
              >
                <span>Cadastrar-se</span>
                <HiOutlineUserPlus />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
