import * as React from 'react';
import { useCartContext } from "../CartProvider";

interface Props {
  children: any;
  className?: string;
  disabled?: boolean;
  form?: string;
  onClick?: () => void;
  type?: string;
}

export default function Button({
  children,
  className = '',
  disabled,
  form,
  onClick,
  type = 'button',
}: Props) {
  const { classNameBtn } = useCartContext();
  return (
    <button
      className={`${classNameBtn} ${className}`}
      disabled={disabled}
      form={form}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
