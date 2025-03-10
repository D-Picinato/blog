'use client';

import { useEffect, useRef, useState } from 'react';
import { useUser } from '@/stores/use-user';
import clsx from 'clsx';
import {
  HiOutlineArrowRightEndOnRectangle,
  HiOutlineUser,
  HiOutlineUserPlus,
} from 'react-icons/hi2';
import { useCustomModal } from '@/stores/use-custom-modal';
import LoginModal from '@/modals/login';
import RegisterModal from '@/modals/register';

export default function User() {
  const { name, session } = useUser();
  const [active, setActive] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { createModal } = useCustomModal();

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
        className="flex items-center gap-2 rounded-md hover:bg-gray-800 p-2 transition-all duration-100"
        onClick={() => setActive((v) => !v)}
      >
        <div className="w-10 h-10 rounded-md bg-gray-600 text-2xl flex items-center justify-center text-gray-300">
          {session ? (
            name
              .split(' ')
              .slice(0, 2)
              .map((name) => name[0].toUpperCase())
              .join('')
          ) : (
            <HiOutlineUser />
          )}
        </div>
        <div className="border border-gray-800 h-10"></div>
        <p className="p-2">{session ? name : 'Entrar'}</p>
      </button>

      <div
        className={clsx(
          'bg-gray-900 border border-gray-800 absolute top-[calc(100%+8px)] p-2 rounded-md transition-all duration-100 w-max',
          active
            ? 'visible opacity-100 scale-y-100'
            : 'invisible opacity-0 scale-y-0'
        )}
      >
        <div className="flex flex-col">
          {session ? (
            <></>
          ) : (
            <>
              <button
                className="flex justify-center items-center gap-2 p-2 px-4 hover:bg-gray-800 rounded-md"
                onClick={() => createModal(<LoginModal />)}
              >
                <span>Entrar</span>
                <HiOutlineArrowRightEndOnRectangle />
              </button>
              <button
                className="flex justify-center items-center gap-2 p-2 px-4 hover:bg-gray-800 rounded-md"
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
