import * as React from 'react';
import { useCartContext } from '../CartProvider';

interface Props {
  children?: any;
}

export default function CartTabContent({ children }: Props) {
  const { classNameCartTab } = useCartContext();
  return (
    <div className={classNameCartTab}>
      {children}
    </div>
  );
}
