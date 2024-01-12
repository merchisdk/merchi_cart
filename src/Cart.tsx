import * as React from 'react';
import { useSelector } from 'react-redux';
import {
  CartFooter,
  LoadingTemplate,
} from './components';
import CartAlert from './CartAlert';
import CartHeader from './CartHeader';
import CartTotals from './CartTotals';
import CartProvider, { PropsCart } from './CartProvider';
import ButtonBack from './buttons/ButtonBack';
import ButtonClearCart from './buttons/ButtonClearCart';
import CartPaymentSettingsInvalid from './components/CartPaymentSettingsInvalid';
import ButtonNextDynamic from './buttons/ButtonNextDynamic';
import PanelCartItems from './panels/PanelCartItems';
import PanelCartShipment from './panels/PanelCartShipment';
import PanelClearCart from './panels/PanelClearCart';
import PanelClientCheckout from './panels/PanelClientCheckout';
import PanelEditCartItem from './panels/PanelEditCartItem';
import PanelPaymentSuccess from './panels/PanelPaymentSuccess';
import {
  tabIdClearCart,
  tabIdItem,
  tabIdPaymentSuccess,
} from './slices/sliceCart';
import {
  TabContent,
} from 'reactstrap';

// interface Props {
//   cartButtonWrappedInContainer?: boolean;
//   cartIconButtonClass?: string;
//   currentUser?: any;
//   customSuccessMessage?: string;
//   domainId: number;
//   hideFacebookLogin?: boolean;
// }

// cartButtonWrappedInContainer = true,
// cartIconButtonClass,
// customSuccessMessage,
// hideFacebookLogin,

export default function Cart(props: PropsCart) {
  const {
    activeTab,
    cartSettingsInvalid,
    fetchingCart,
  } = useSelector((s: any) => s.stateCart);

  return (
    <CartProvider {...props}>
      <CartHeader />
      <CartAlert />
      {fetchingCart ? (
        <LoadingTemplate />
      ) : cartSettingsInvalid ? (
        <CartPaymentSettingsInvalid />
      ) : (
        <TabContent
          activeTab={activeTab}
          className='merchi-tab-pane'
        >
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
        </TabContent>
      )}
    </CartProvider>
  );
}
