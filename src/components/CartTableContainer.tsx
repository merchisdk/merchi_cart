import * as React from 'react';
import { useCartContext } from '../CartProvider';

interface Props {
  children: any;
}

export default function CartTableContainer({ children }: Props) {
  const { classNameTableContainer } = useCartContext();
  return (
    <div className={classNameTableContainer}>
      {children}
    </div>
  );
}
