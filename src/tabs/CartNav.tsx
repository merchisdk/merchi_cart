import * as React from 'react';
import { useSelector } from 'react-redux';
import { useCartContext } from '../CartProvider';
import { tabIdPaymentSuccess } from '../slices/sliceCart';
import NavTab from './NavTab';

function CartNav() {
  const { classNameCartNav } = useCartContext();
  const { tabs } = useSelector((s: any) => s.stateCart);
  return (
    <div className={classNameCartNav}>
      {tabs.filter((tab: any) => tab.tabId !== tabIdPaymentSuccess).
        map((tab: any, index: number) =>
          <NavTab {...tab} key={`${index}-tab`} />
      )}
    </div>
  );
}

export default CartNav;
