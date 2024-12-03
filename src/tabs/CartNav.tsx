import * as React from 'react';
import { useCartContext } from '../CartProvider';
import { tabIdPaymentSuccess } from '../utilities/tabs';
import NavTab from './NavTab';

function CartNav() {
  const { classNameCartNav, tabs } = useCartContext();
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
