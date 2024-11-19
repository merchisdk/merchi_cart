import {
  faCheckCircle,
  faCreditCard,
  faMapMarkerAlt,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { Tab } from '../types';

export const tabIdClearCart = -2;
export const tabIdItem = -1;
export const tabIdItems = 0;
export const tabIdShipment = 1;
export const tabIdCheckout = 2;
export const tabIdPaymentSuccess = 3;

export const tabItems: Tab = {disabled: false, icon: faShoppingCart, tabId: tabIdItems, name: 'Items'};
export const tabShipment: Tab = {disabled: true, icon: faMapMarkerAlt, tabId: tabIdShipment, name: 'Address'};
export const tabCheckout: Tab = {disabled: true, icon: faCreditCard, tabId: tabIdCheckout, name: 'Checkout'};
const tabCheckoutSuccess: Tab = {
  disabled: true,
  icon: faCheckCircle,
  tabId: tabIdPaymentSuccess,
  name: 'Success',
};

export const initTabs: Tab[] = [tabItems, tabCheckout, tabCheckoutSuccess];
export const tabsWithShipment: Tab[] = [tabItems, tabShipment, tabCheckout, tabCheckoutSuccess];

export function setDisableTab(tab: any, disabled: boolean) {
  return {...tab, disabled};
}

export function cartHasShippmentGroupsAndAllHaveSelectedGroups(cart: any) {
  const shipmentGroups = cart.shipmentGroups ? cart.shipmentGroups : [];
  const haveSelectedQuotes = shipmentGroups.map((g: any) => Boolean(g.selectedQuote));
  return shipmentGroups.length && !haveSelectedQuotes.includes(false);
}

