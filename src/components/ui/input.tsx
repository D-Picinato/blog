'use client';

import clsx from 'clsx';
import { JSX, useEffect, useState } from 'react';

/** Props para o componente Input */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  icon?: JSX.Element;
  errorMessage?: string;
  message?: string;
  containerProps?: React.InputHTMLAttributes<HTMLDivElement>;
  labelProps?: React.InputHTMLAttributes<HTMLLabelElement>;
}

/** Componente Input estilizado */
export default function Input({
  id,
  label,
  icon,
  errorMessage,
  message,
  containerProps,
  labelProps,
  placeholder,
  defaultValue,
  onFocus,
  onBlur,
  onChange,
  className,
  ...props
}: InputProps) {
  const [active, setActive] = useState<boolean>(!!defaultValue);
  const [hasValue, setHasValue] = useState<boolean>(!!defaultValue);

  return (
    <div
      {...containerProps}
      className={clsx(
        'relative flex h-12 **:cursor-text',
        errorMessage && 'mb-6',
        containerProps?.className
      )}
    >
      <label
        htmlFor={id}
        {...labelProps}
        className={clsx(
          'absolute top-0 left-0 flex items-center transition-all duration-200',
          active || hasValue ? 'text-xs h-4 px-2' : 'h-full px-4',
          errorMessage && 'text-red-500',
          labelProps?.className
        )}
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        placeholder={active ? placeholder : ''}
        defaultValue={defaultValue}
        {...props}
        onFocus={(e) => {
          if (onFocus) onFocus(e);
          setActive(true);
        }}
        onBlur={(e) => {
          if (onBlur) onBlur(e);
          setActive(false);
        }}
        onChange={(e) => {
          if (onChange) onChange(e);
          setHasValue(!!e.target.value);
        }}
        className={clsx(
          'border-none bg-none pt-2 pl-4 outline-none w-full',
          className
        )}
      />
      {icon && (
        <label htmlFor={id} className="flex items-center px-4 text-gray-100">
          {icon}
        </label>
      )}
      <div className="absolute bottom-0 w-full h-px flex bg-gray-500">
        <div
          className={clsx(
            'transition-all duration-200 bg-gray-100',
            active || hasValue ? 'w-full' : 'w-0',
            errorMessage && 'bg-red-500'
          )}
        ></div>
      </div>
      {errorMessage ? (
        <p className="absolute -bottom-5 text-xs text-red-500">
          {errorMessage}
        </p>
      ) : (
        message && <p className="absolute -bottom-5 text-xs">{errorMessage}</p>
      )}
    </div>
  );
}
