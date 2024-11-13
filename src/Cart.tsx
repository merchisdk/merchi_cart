import * as React from 'react';
import CartAlert from './CartAlert';
import CartHeader from './CartHeader';
import CartNav from './tabs/CartNav';
import CartTotals from './CartTotals';
import CartProvider, { PropsCart, useCartContext } from './CartProvider';
import {
  ButtonBack,
  ButtonClearCart,
  ButtonNextDynamic,
} from './buttons';
import {
  CartFooter,
  CartPaymentSettingsInvalid,
  LoadingTemplate,
} from './components';
import {
  PanelCartItems,
  PanelCartShipment,
  PanelClearCart,
  PanelClientCheckout,
  PanelEditCartItem,
  PanelPaymentSuccess,
}from './panels';
import {
  tabIdCheckout,
  tabIdClearCart,
  tabIdItem,
  tabIdPaymentSuccess,
} from './utilities/tabs';
import './styles/globals.css';

export function CartComponents() {
  const {
    activeTabIndex,
    cart,
    cartSettingsInvalid,
    fetchingCart,
    hideHead,
  } = useCartContext();
  return (
    <>
      {!hideHead && <CartHeader />}
      <CartAlert />
      <CartNav />
      {fetchingCart ? (
        <LoadingTemplate />
      ) : cartSettingsInvalid ? (
        <CartPaymentSettingsInvalid />
      ) : (
        <div className='merchi-tab-pane'>
          <PanelClearCart />
          <PanelEditCartItem cart={cart} />
          <PanelCartItems />
          <PanelCartShipment />
          <PanelClientCheckout />
          <PanelPaymentSuccess />
          {![tabIdItem, tabIdClearCart, tabIdPaymentSuccess].includes(activeTabIndex) &&
            <>
              {activeTabIndex !== tabIdCheckout && (<CartTotals />)}
              <CartFooter>
                <ButtonBack />
                <ButtonClearCart />
                <ButtonNextDynamic />
              </CartFooter>
            </>
          }
        </div>
      )}
    </>
  );
}

export default function Cart(props: PropsCart) {
  return (
    <CartProvider {...props}>
      <CartComponents />
    </CartProvider>
  );
}
