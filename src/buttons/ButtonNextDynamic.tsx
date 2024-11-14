import * as React from 'react';
import { useCartContext } from '../CartProvider';
import {
  tabIdCheckout,
  tabIdItems,
  tabIdPaymentSuccess,
  tabIdShipment,
} from '../utilities/tabs';
import ButtonNext from './ButtonNext';
import ButtonShipmentTabNext from './ButtonShipmentTabNext';

function ButtonNextDynamic() {
  const { cart, activeTabIndex } = useCartContext();
  const cartItems = cart.cartItems;
  const hasCartItems = cartItems && cartItems.length;
  const isCartItemsTabActive = activeTabIndex === tabIdItems;
  const isShipmentTabActive = activeTabIndex === tabIdShipment;
  const isCheckoutTabOpen = activeTabIndex === tabIdCheckout;
  const isPaymentSuccessOpen = activeTabIndex === tabIdPaymentSuccess;
  return isCheckoutTabOpen || isPaymentSuccessOpen ? (
    <></>
  ) : isShipmentTabActive ? (
    <ButtonShipmentTabNext />
  ) : isCartItemsTabActive && !hasCartItems ? (
    <></>
  ) : (
    <ButtonNext />
  );
}

export default ButtonNextDynamic;
