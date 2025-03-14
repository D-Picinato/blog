'use client';

import { JSX, useEffect, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import clsx from 'clsx';

const variants = {
  solid: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  border:
    'text-gray-100 border border-solid border-gray-100 hover:bg-transparent-light',
  clean: 'text-gray-100 hover:bg-transparent-light',
  danger: 'text-red-600 bg-transparent-red hover:bg-transparent-red',
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  icon?: JSX.Element;
  loading?: boolean;
  disable?: boolean;
}

/** Componente de botão estilizado */
export default function Button({
  variant = 'solid',
  icon,
  loading,
  disable,
  children,
  onClick,
  className,
  ...props
}: ButtonProps) {
  const [isDisable, setIsDisable] = useState<boolean>(!!disable);

  useEffect(() => {
    setIsDisable(!!loading || !!disable);
  }, [loading, disable]);

  return (
    <button
      {...props}
      onClick={(e) => !isDisable && onClick && onClick(e)}
      className={clsx(
        'border-none bg-none **:cursor-pointer px-4 h-10 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors duration-100',
        variants[variant],
        !!!children && 'w-10 p-0',
        isDisable && 'brightness-50 cursor-not-allowed',
        !isDisable && loading && 'cursor-default',
        className
      )}
    >
      {children && children}
      {icon && !loading && icon}
      {loading && <AiOutlineLoading className="loadingIcon" />}
    </button>
  );
}
