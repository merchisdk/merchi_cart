import * as React from 'react';
import { useCartContext } from '../CartProvider';
import { tabIdClearCart } from '../slices/sliceCart';
import { setActiveTab } from '../store';
import Button from './Button';

function ButtonClearCart() {
  const {
    classNameBtnCartClear
  } = useCartContext();
  return (
    <Button
      className={classNameBtnCartClear}
      onClick={() => setActiveTab(tabIdClearCart)}
    >
      Clear cart
    </Button>
  );
}

export default ButtonClearCart;
