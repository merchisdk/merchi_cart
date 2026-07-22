import * as React from 'react';
import { Suspense, lazy } from 'react';
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
import { LoadingTemplateSm } from './components/LoadingTemplate';
import PanelCartItems from './panels/PanelCartItems';
import PanelCartShipment from './panels/PanelCartShipment';
import PanelClearCart from './panels/PanelClearCart';
import PanelPaymentSuccess from './panels/PanelPaymentSuccess';
import {
  tabIdCheckout,
  tabIdClearCart,
  tabIdItem,
  tabIdPaymentSuccess,
} from './utilities/tabs';
import './styles/globals.css';

// Heavy panels: keep out of the initial cart chunk until their tab is opened.
const PanelClientCheckout = lazy(() => import('./panels/PanelClientCheckout'));
const PanelEditCartItem = lazy(() => import('./panels/PanelEditCartItem'));

interface Props {
  footer?: React.ReactElement;
}

export function CartComponents({
  footer
}: Props) {
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
          <Suspense fallback={<LoadingTemplateSm />}>
            {activeTabIndex === tabIdItem && (
              <PanelEditCartItem cart={cart} />
            )}
            {activeTabIndex === tabIdCheckout && (
              <PanelClientCheckout />
            )}
          </Suspense>
          <PanelCartItems />
          <PanelCartShipment />
          <PanelPaymentSuccess />
          {![tabIdItem, tabIdClearCart, tabIdPaymentSuccess].includes(activeTabIndex) &&
            <>
              {activeTabIndex !== tabIdCheckout && (<CartTotals />)}
              {footer || (
                <CartFooter>
                  <ButtonBack />
                  <ButtonClearCart />
                  <ButtonNextDynamic />
                </CartFooter>
              )}
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
      <CartComponents footer={props.footer} />
    </CartProvider>
  );
}
