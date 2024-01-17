import * as React from 'react';
import { useCartContext } from '../CartProvider';

interface Props {
  children: any;
  style?: any;
}

export default function CartBody({ children, style }: Props) {
  const { classNameCartBody } = useCartContext();
  return (
    <div className={classNameCartBody} style={style}>
      {children}
    </div>
  );
}
