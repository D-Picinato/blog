import clsx from 'clsx';
import { ReactNode } from 'react';
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
  HiOutlineInformationCircle,
} from 'react-icons/hi2';

const variants = {
  info: {
    icon: <HiOutlineInformationCircle className="size-[25px]" />,
    classes: 'bg-blue-300 text-blue-800 !border-blue-800',
  },
  success: {
    icon: <HiOutlineCheckCircle className="size-[25px]" />,
    classes: 'bg-green-300 text-green-800 !border-green-800',
  },
  warning: {
    icon: <HiOutlineExclamationTriangle className="size-[25px]" />,
    classes: 'bg-yellow-300 text-yellow-800 !border-yellow-800',
  },
  danger: {
    icon: <HiOutlineExclamationTriangle className="size-[25px]" />,
    classes: 'bg-red-300 text-red-800 !border-red-800',
  },
};

interface ToastProps {
  children: ReactNode;
  variant?: keyof typeof variants;
}

export default function Toast({
  children,
  variant = 'info',
  ...props
}: ToastProps) {
  return (
    !closed && (
      <div
        className={clsx(
          'relative flex items-center gap-4 rounded-lg border px-4 py-2 text-base leading-tight',
          variants[variant].classes
        )}
        {...props}
      >
        {variants[variant].icon}
        {children}
      </div>
    )
  );
}
