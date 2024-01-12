import * as React from 'react';
import { useSelector } from 'react-redux';
import { tabIdPaymentSuccess } from '../slices/sliceCart';
import NavTab from './NavTab';
import { Nav } from 'reactstrap';

function CartNav() {
  const { tabs } = useSelector((s: any) => s.stateCart);
  return (
    <Nav
      className='merchi-nav merchi-nav-fill merchi-nav-pills'
      tabs
    >
      {
        tabs.filter(
          (tab: any) => tab.tabId !== tabIdPaymentSuccess
        ).map(
          (tab: any, index: number) =>
            <NavTab {...tab} key={`${index}-tab`} />
        )
      }
    </Nav>
  );
}

export default CartNav;
