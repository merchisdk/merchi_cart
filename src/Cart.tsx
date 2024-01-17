import * as React from 'react';
import { Provider, useSelector } from 'react-redux';
import { store } from './store';
import CartAlert from './CartAlert';
import CartHeader from './CartHeader';
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
  tabIdClearCart,
  tabIdItem,
  tabIdPaymentSuccess,
} from './slices/sliceCart';
import {
  actionFetchTheme,
  initMerchiCart,
} from './store';

function CartComponents() {
  const {
    domainId,
    includeTheme,
    initialiseCart
  } = useCartContext();
  const {
    activeTab,
    cartSettingsInvalid,
    fetchingCart,
  } = useSelector((s: any) => s.stateCart);
  React.useEffect(() => {
    if (initialiseCart && domainId) {
      if (includeTheme) {
        actionFetchTheme(domainId);
      }
      initMerchiCart(domainId);
    }
  }, [domainId, includeTheme, initialiseCart]);
  return (
    <>
      <CartHeader />
      <CartAlert />
      {fetchingCart ? (
        <LoadingTemplate />
      ) : cartSettingsInvalid ? (
        <CartPaymentSettingsInvalid />
      ) : (
        <div className='merchi-tab-pane'>
          <PanelClearCart />
          <PanelEditCartItem />
          <PanelCartItems />
          <PanelCartShipment />
          <PanelClientCheckout />
          <PanelPaymentSuccess />
          {![tabIdItem, tabIdClearCart, tabIdPaymentSuccess].includes(activeTab) &&
            <>
              <CartFooter>
                <CartTotals />
              </CartFooter>
              <CartFooter>
                <ButtonClearCart />
                <ButtonBack />
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
      <Provider store={store}>
        <CartComponents />
        <CartHeader />
        <CartAlert />
      </Provider>
    </CartProvider>
  );
}
