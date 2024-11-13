import * as React from 'react';
import { useSelector } from 'react-redux';
import {
  tabIdCheckout,
  tabIdItems,
  tabIdPaymentSuccess,
  tabIdShipment,
} from '../utilities/tabs';
import ButtonNext from './ButtonNext';
import ButtonShipmentTabNext from './ButtonShipmentTabNext';

function ButtonNextDynamic() {
  const { cart, activeTab } = useSelector((s: any) => s.stateCart);
  const cartItems = cart.cartItems;
  const hasCartItems = cartItems && cartItems.length;
  const isCartItemsTabActive = activeTab === tabIdItems;
  const isShipmentTabActive = activeTab === tabIdShipment;
  const isCheckoutTabOpen = activeTab === tabIdCheckout;
  const isPaymentSuccessOpen = activeTab === tabIdPaymentSuccess;
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
