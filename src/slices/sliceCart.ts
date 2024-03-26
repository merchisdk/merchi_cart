import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  faCheckCircle,
  faCreditCard,
  faMapMarkerAlt,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';

export const tabIdClearCart = -2;
export const tabIdItem = -1;
export const tabIdItems = 0;
export const tabIdShipment = 1;
export const tabIdCheckout = 2;
export const tabIdPaymentSuccess = 3;

const tabItems = {disabled: false, icon: faShoppingCart, tabId: tabIdItems, name: 'Items'};
const tabShipment = {disabled: true, icon: faMapMarkerAlt, tabId: tabIdShipment, name: 'Address'};
const tabCheckout = {disabled: true, icon: faCreditCard, tabId: tabIdCheckout, name: 'Checkout'};
const tabCheckoutSuccess = {
  disabled: true,
  icon: faCheckCircle,
  tabId: tabIdPaymentSuccess,
  name: 'Success',
};

const initTabs: Array<any> = [tabItems, tabCheckout, tabCheckoutSuccess];
const tabsWithShipment: Array<any> = [tabItems, tabShipment, tabCheckout, tabCheckoutSuccess];

function setDisableTab(tab: any, disabled: boolean) {
  return {...tab, disabled};
}

function cartHasShippmentGroupsAndAllHaveSelectedGroups(cart: any) {
  const shipmentGroups = cart.shipmentGroups ? cart.shipmentGroups : [];
  const haveSelectedQuotes = shipmentGroups.map((g: any) => Boolean(g.selectedQuote));
  return shipmentGroups.length && !haveSelectedQuotes.includes(false);
}

export function cartItemsNeedShipment(cart: any) {
  const { cartItems = [] } = cart;
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].product && cartItems[i].product.needsShipping) {
      return true;
    }
  }
  return false;
}

export const sliceCart = createSlice({
  initialState: {
    activeTab: 0,
    cart: {},
    cartSettingsInvalid: false,
    deletingCartItemIndex: undefined,
    domainId: undefined,
    fetchingCart: false,
    loading: false,
    modalCartOpen: false,
    modalClearCartOpen: false,
    needsShipping: false,
    tabs: initTabs,
  },
  name: 'stateCart',
  reducers: {
    cartSettingsInvalid: (state: any) => {
      state.cartSettingsInvalid = true;
      state.fetchingCart = false;
    },
    deleteCartItem: (state: any, action: PayloadAction<any>) => {
      state.deletingCartItemIndex = action.payload;
    },
    deleteCartItemError: (state: any) => {
      state.deletingCartItemIndex = undefined;
    },
    deleteCartItemSuccess: (state: any, action: PayloadAction<any>) => {
      const cart = action.payload;
      const needsShipping = cartItemsNeedShipment(cart);
      state.deletingCartItemIndex = undefined;
      state.cart = cart;
      state.needsShipping = needsShipping;
      if (cart.cartItems.length === 0) {
        state.tabs = initTabs;
      } else {
        if (needsShipping) {
          state.tabs = tabsWithShipment;
          if (cart.cartItems.length) {
            state.tabs[1] = setDisableTab(tabShipment, false);
            if (cartHasShippmentGroupsAndAllHaveSelectedGroups(cart)) {
              state.tabs[2] = setDisableTab(tabCheckout, false);
            }
          }
        } else {
          state.tabs = initTabs;
        }
      }
    },
    fetchCart: (state: any) => {
      state.fetchingCart = true;
    },
    fetchCartError: (state: any) => {
      state.fetchingCart = false;
    },
    fetchCartSuccess: (state: any, action: PayloadAction<any>) => {
      const cart = action.payload;
      const needsShipping = cartItemsNeedShipment({...cart});
      state.cart = cart;
      state.needsShipping = needsShipping;
      if (needsShipping) {
        const initShipment = [...tabsWithShipment];
        if (cart.cartItems.length) {
          initShipment[1] = setDisableTab(tabShipment, false);
          if (cartHasShippmentGroupsAndAllHaveSelectedGroups(cart)) {
            initShipment[2] = setDisableTab(tabCheckout, false);
          }
        }
        state.tabs = initShipment;
      } else {
        state.tabs = initTabs;
      }
      state.activeTab = 0;
      state.fetchingCart = false;
    },
  	fetchTheme: (state: any) => {
      state.loading = true;
    },
    fetchThemeError: (state: any) => {
      state.loading = false;
    },
    fetchThemeSuccess: (state: any) => {
      state.loading = false;
    },
    setActiveTab: (state: any, action: PayloadAction<number>) => {
      state.activeTab = action.payload;
    },
    setActiveTabAndEditDisabled: (state: any, action: PayloadAction<any>) => {
      const { tabId, tabIndexToSet, disabled } = action.payload;
      state.activeTab = tabId;
      state.tabs[tabIndexToSet].disabled = disabled;
    },
    setCart: (state: any, action: PayloadAction<any>) => {
      state.cart = action.payload;
    },
    setCartShipmentGroups: (state: any, action: PayloadAction<any>) => {
      state.cart.shipmentGroups = action.payload;
    },
    setCartClient: (state: any, action: PayloadAction<any>) => {
      state.cart.client = action.payload;
    },
    setDomainId: (state: any, action: PayloadAction<number>) => {
      state.domainId = action.payload;
    },
    toggleCartOpen: (state: any) => {
      state.modalCartOpen = !state.modalCartOpen;
    },
    toggleClearCart: (state: any) => {
      state.modalClearCartOpen = !state.modalClearCartOpen;
    },
  },
});
