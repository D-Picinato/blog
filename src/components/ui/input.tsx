'use client';

import clsx from 'clsx';
import { JSX, useEffect, useState } from 'react';
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';

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
  type = 'text',
  ...props
}: InputProps) {
  const [active, setActive] = useState<boolean>(!!defaultValue);
  const [hasValue, setHasValue] = useState<boolean>(!!defaultValue);
  const [inputType, setInputType] = useState<typeof type>(type);

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
        type={inputType}
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
      {icon ? (
        <label htmlFor={id} className="flex items-center px-4 text-gray-100">
          {icon}
        </label>
      ) : (
        type == 'password' && (
          <button
            className="flex items-center px-4 text-gray-100 !cursor-pointer **:!cursor-pointer"
            type="button"
            onClick={() =>
              setInputType(inputType == 'password' ? 'text' : 'password')
            }
          >
            {inputType == 'password' ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
          </button>
        )
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
        <label htmlFor={id} className="absolute -bottom-5 text-xs text-red-500">
          {errorMessage}
        </label>
      ) : (
        message && (
          <label htmlFor={id} className="absolute -bottom-5 text-xs">
            {message}
          </label>
        )
      )}
    </div>
  );
}
