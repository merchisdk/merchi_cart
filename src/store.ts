import { batch } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  sliceCart,
  tabIdCheckout,
  tabIdItem,
  tabIdItems,
  tabIdPaymentSuccess,
} from './slices/sliceCart';
import { sliceCartAlert } from './slices/sliceCartAlert';
import sliceCartItem from './slices/sliceCartItem';
import { sliceCartPayment } from './slices/sliceCartPayment';
import { sliceCartShipment } from './slices/sliceCartShipment';
import sliceNewCustomerForm from './slices/sliceNewCustomerForm';
import sliceFormReturningCustomer from './slices/sliceFormReturningCustomer';
import reducersSquare from './square/slices/reducersSquare';
import sliceStripeCardForm from './stripe/slices/sliceStripeCardForm';
import { Merchi } from './MerchiSDK/merchi';
import { cartEmbed } from './utilities/helpers';
import { makeAddress } from './utilities/address';
import {
  getCartCookie as getMerchiCartCookie,
  setCartCookie,
} from './utilities/cookie';
import {
  getCartShipmentGroupsAndQuotes,
  makeCart,
  makeCartItem,
  makeCartShipmentQuote,
  stripeIsValidAndActive,
} from './utilities/cart';
import {
  makeUser,
  createNewCustomer,
  tryReturningCustomerEmail,
} from './utilities/user';
import { appendStyleSheetText } from './utilities/helpers';

const merchi = new Merchi();

const middleware = getDefaultMiddleware({ serializableCheck: false });

const merchiCartReducer = {
  stateCartAlert: sliceCartAlert.reducer,
  stateCartItem: sliceCartItem.reducer,
  stateCartPayment: sliceCartPayment.reducer,
  stateCartShipment: sliceCartShipment.reducer,
  stateCart: sliceCart.reducer,
  stateNewCustomerForm: sliceNewCustomerForm.reducer,
  stateFormReturningCustomer: sliceFormReturningCustomer.reducer,

  // Square slices
  ...reducersSquare,

  // Stripe slices
  ...sliceStripeCardForm,
};

export const store = configureStore({
  middleware: [...middleware],
  reducer: merchiCartReducer,
});

function getStore() {
  return store.getState();
}

const {
  deleteCartItem,
  deleteCartItemError,
  deleteCartItemSuccess,
  fetchCart,
  fetchCartError,
  fetchCartSuccess,
  fetchTheme,
  fetchThemeError,
  fetchThemeSuccess,
  setCart,
  setCartClient,
  setDomainId,
  setCartShipmentGroups,
} = sliceCart.actions;

async function getCartToken() {
  const { domainId } = getStore().stateCart;
  const cartIdAndToken = domainId ? await getMerchiCartCookie(Number(domainId)) : undefined;
  return cartIdAndToken && cartIdAndToken[1] ? cartIdAndToken[1] : undefined;
}

function dispatch(method: any) {
  store.dispatch(method);
}

export function axtionSetCartClient(client: any) {
  dispatch(setCartClient(client));
}

export function setCartItem(cartItem: any, index: number) {
  batch(() => {
    if (cartItem && cartItem.id) {
      setActiveTab(tabIdItem);
    } else {
      setActiveTab(tabIdItems);
    }
    dispatch(sliceCartItem.actions.setCartItem({ cartItem, index }));
  });
}

export function setActiveTab(tabId: number) {
  dispatch(sliceCart.actions.setActiveTab(tabId));
}

interface setActiveTabAndEditDisabledProps {
  tabId: number;
  tabIndexToSet: number;
  disabled: boolean;
}

export function setActiveTabAndEditDisabled(settings: setActiveTabAndEditDisabledProps) {
  dispatch(sliceCart.actions.setActiveTabAndEditDisabled(settings));
}

export function closeAlert() {
  dispatch(sliceCartAlert.actions.closeAlert());
}

export function closeClearCart() {
  dispatch(sliceCart.actions.setActiveTab(tabIdItems));
}

export function alertError(message: string) {
  dispatch(sliceCartAlert.actions.showAlertDanger(
    { message, title: 'Error!' }));
}

function alertSuccess(message: string) {
  dispatch(sliceCartAlert.actions.showAlertSuccess(
    { message, title: 'Success!' }));
}

export function actionFetchTheme(id: number) {
  dispatch(fetchTheme())
  merchi.Domain.get(id, {embed: {activeTheme: {mainCss: {}}}})
    .then((domain: any) => {
      return domain.activeTheme;
    })
    .then((theme: any) => {
      appendStyleSheetText(theme.mainCss, () => dispatch(fetchThemeSuccess()));
    })
    .catch((e: any) => {
      alertError(e.errorMessage);
      dispatch(fetchThemeError());
    });
}

async function cartAndCookie() {
  const { domainId } = getStore().stateCart;
  const cart = makeCart({domain: {id: domainId}}, true);
  return cart.create({embed: cartEmbed})
    .then((c: any) => {
      if (domainId) {
        setCartCookie(Number(domainId), c.toJson(), undefined);
      }
      return c.toJson();
    })
    .then((cJson: any) => {
      dispatch(fetchCartSuccess(cJson));
    })
    .catch((e: any) => {
      batch(() => {
        alertError(e.errorMessage);
        dispatch(fetchCartError());
      });
    });
}

export async function createAndSetNewCartCookie() {
  dispatch(fetchCart());
  await cartAndCookie();
}

export async function doClearCart() {
  dispatch(setCart({}));
  closeClearCart();
  await createAndSetNewCartCookie();
}

export async function patchCartItem(cartItem: any) {
  const data = getStore();
  const {
    patchCartItem: doPatch,
    patchCartItemError: doPatchError,
    patchCartItemSuccess: doPatchSuccess,
  } = sliceCartItem.actions;
  const cartToken = await getCartToken();
  const {
    stateCart: { cart },
    stateCartItem: { cartItem: stateCartItem, index }
  } = data;
  const cartEnt = makeCart(cart, false, cartToken);
  const cartItemEnt = makeCartItem(cartItem, true);
  cartItemEnt.id = (stateCartItem as any).id;
  (cartEnt as any).cartItems[index] = cartItemEnt;
  dispatch(doPatch());
  cartEnt.save({embed: cartEmbed}).
    then(
      (c: any) => {
        batch(() => {
          alertSuccess('Item updated.');
          dispatch(setCart(c.toJson()));
          dispatch(doPatchSuccess());
          setActiveTab(tabIdItems);
        });
      }
    ).
    then(() => {
      setCartItem({}, 0);
    }).
    catch(
      (e: any) => {
        batch(() => {
          alertError(e.errorMessage);
          dispatch(doPatchError());
        });
      }
    );
}

export async function actionDeleteCartItem(index: number) {
  const data = getStore();
  const cartToken = await getCartToken();
  const { stateCart: { cart } } = data;
  const cartEnt = makeCart(cart, false, cartToken);
  const cartItems = (cartEnt as any).cartItems;
  cartItems.splice(index, 1);
  (cartEnt as any).cartItems = cartItems;
  dispatch(deleteCartItem(index));
  cartEnt.save({embed: cartEmbed}).
    then(
      (c: any) => {
        dispatch(deleteCartItemSuccess(c.toJson()));
      }
    ).
    catch(
      (e: any) => {
        batch(() => {
          alertError(e.errorMessage);
          dispatch(deleteCartItemError());
        });
      }
    );
}

export async function updateCartShipmentAddress() {
  const {
    updateShipmentAddressError,
    updateShipmentAddressSuccess,
  } = sliceCartShipment.actions;
  const cartToken = await getCartToken();
  const {
    stateCart: { cart },
    stateCartShipment: { receiverAddress: address },
  } = getStore();
  const receiverAddress = makeAddress(address, true);
  const cartEnt = makeCart(cart, false, cartToken);
  cartEnt.receiverAddress = receiverAddress;
  cartEnt.save({embed: cartEmbed}).
    then((c: any) => {
      dispatch(setCart(c.toJson()));
      getCartShipmentGroupsAndQuotes(c.toJson()).
        then((cartWithShipmentGroups: any) => {
          const cartJson = cartWithShipmentGroups;
          batch(() => {
            dispatch(setCartShipmentGroups(cartJson.shipmentGroups));
            dispatch(updateShipmentAddressSuccess(cartJson.shipmentGroups));
          });
        });
    }).
    catch((e: any) => {
      batch(() => {
        alertError(e.errorMessage);
        dispatch(updateShipmentAddressError());
      });
    });
}

export async function saveCartShipmentAddressAndGoToNextTab(values: any) {
  const { receiverAddress: address, receiverNotes } = values;
  const {
    saveShipmentAddress,
    saveShipmentAddressError,
    saveShipmentAddressSuccess,
  } = sliceCartShipment.actions;
  const cartToken = await getCartToken();
  const { stateCart: { cart } } = getStore();
  dispatch(saveShipmentAddress());
  const receiverAddress = makeAddress(address, true);
  const cartEnt = makeCart(cart, false, cartToken);
  cartEnt.receiverAddress = receiverAddress;
  cartEnt.receiverNotes = receiverNotes;
  cartEnt.save({embed: cartEmbed}).
    then((c: any) => {
      batch(() => {
        dispatch(setCart(c.toJson()));
        dispatch(saveShipmentAddressSuccess());
        setActiveTabAndEditDisabled(
          {tabId: tabIdCheckout, tabIndexToSet: 2, disabled: false});
      });
    }).
    catch((e: any) => {
      batch(() => {
        alertError(e.errorMessage);
        dispatch(saveShipmentAddressError());
      });
    });
}

async function attachClientToCart(clientJson: any) {
  const {
    createNewCustomerSuccess: createNewSuccess,
  } = sliceNewCustomerForm.actions;
  const cartToken = await getCartToken();
  const { stateCart: { cart } } = getStore();
  const clientEnt = makeUser({id: clientJson.id});
  const cartEnt = makeCart(cart, false, cartToken);
  cartEnt.client = clientEnt;
  return cartEnt.save({embed: cartEmbed}).
    then((c: any) => {
      dispatch(setCart(c.toJson()));
      dispatch(createNewSuccess());
    });
}

export async function setSelectedShipmentQuote(groupIndex: number, quote: any) {
  const cartToken = await getCartToken();
  const { stateCart: { cart } } = getStore();
  const {
    setSelectedShipmentQuote: setSelected,
    setSelectedShipmentQuoteError,
    setSelectedShipmentQuoteSuccess,
  } = sliceCartShipment.actions;
  const cartEnt = makeCart(cart, false, cartToken);
  const cartShipmentQuote = makeCartShipmentQuote(quote);
  (cartEnt as any).shipmentGroups[groupIndex].selectedQuote = cartShipmentQuote;
  dispatch(setSelected({ groupIndex, quote }));
  cartEnt.save({embed: cartEmbed}).
    then((c: any) => {
      dispatch(setCart(c.toJson()));
      dispatch(setSelectedShipmentQuoteSuccess());
    }).
    catch((e: any) => {
      batch(() => {
        alertError(e.errorMessage);
        dispatch(setSelectedShipmentQuoteError());
      });
    });
}

const {
  setReturningCustomerError,
  tryReturningCustomer: tryReturning,
  tryReturningCustomerError,
  tryReturningCustomerSuccess,
} = sliceFormReturningCustomer.actions;

export function tryReturningCustomer(urlApi: string, data: any) {
  const { emailAddress } = data;
  dispatch(tryReturning());
  tryReturningCustomerEmail(urlApi, emailAddress)
  .then((r: any) => attachClientToCart({
      emailAddresses: [{emailAddress}],
      id: r.user_id,
    }))
  .then(() => dispatch(tryReturningCustomerSuccess()))
  .catch((e: any) =>
    batch(() => {
      alertError(e.errorMessage);
      dispatch(tryReturningCustomerError());
      dispatch(setReturningCustomerError(true));
    }));
}

const {
  createNewCustomer: createNew,
  createNewCustomerError: createNewError,
  createNewCustomerSuccess: createNewSuccess,
} = sliceNewCustomerForm.actions;

export function actionCreateNewCustomer(urlApi: string, customerJson: any) {
  const { cart } = getStore().stateCart;
  const domainId = cart && (cart as any).domain && (cart as any).domain.id;
  dispatch(createNew());
  const user = makeUser(
    {...customerJson,
      registeredUnderDomains: [{id: domainId}]},
    true
  );
  const error = (e: any) => batch(
    () => {
      alertError(e.errorMessage);
      dispatch(createNewError(e.errorMessage));
    });
  createNewCustomer(urlApi, {...customerJson, registeredUnderDomains: [{id: domainId}]})
    .then((r: any) => {
      const { user: userJson } = r;
      attachClientToCart(userJson);
    })
    .then(() => dispatch(createNewSuccess()))
    .catch(error);
}

const { creditCardPaySuccess } = sliceCartPayment.actions; 

export function callbackCreditCardPaymentSuccess(invoiceJson: any) {
  batch(() => {
    dispatch(creditCardPaySuccess(invoiceJson));
    setActiveTab(tabIdPaymentSuccess);
  });
}

async function convertToJson(ent: any) {
  const json = await ent.toJson();
  return json;
}

function updateCartValues(cartJson: any) {
  const { initCartShipmentSlice } = sliceCartShipment.actions;
  dispatch(sliceCart.actions.fetchCartSuccess(cartJson));
  dispatch(initCartShipmentSlice(cartJson));
}

function getCart(cartIdAndToken: Array<string>) {
  const {
    cartSettingsInvalid,
  } = sliceCart.actions;
  const id = Number(cartIdAndToken[0]);
  if (cartIdAndToken[1]) {
    merchi.cartToken = cartIdAndToken[1];
  }
  dispatch(fetchCart());
  merchi.Cart.get(id, {embed: cartEmbed})
    .then(convertToJson)
    .then((cart: any) => {
      if (stripeIsValidAndActive(cart)) {
        updateCartValues(cart);
      } else {
        console.error(
         `MErhci cart error: Stripe payment ` +
          `options have not been correctly set up. ` +
          `Check the company profile payment options tab ` +
          `to set and edit stripe payment options.`);
        dispatch(cartSettingsInvalid());
      }
    })
    .catch((e: any) => {
      createAndSetNewCartCookie();
    });
}

export async function getMerchiCart(domainId: number) {
  const cartIdAndToken = await getMerchiCartCookie(domainId);
  dispatch(setDomainId({ cartIdAndToken, domainId }));
  if (cartIdAndToken) {
    getCart(cartIdAndToken);
  } else {
    createAndSetNewCartCookie();
  }
}

export async function isMerchiCartFetching() {
  return getStore().stateCart.fetchingCart;
}

export async function getMerchiCartValues() {
  const { cart } = getStore().stateCart;
  const { cartItems, currency, subtotalCost, taxAmount, totalCost } = (cart as any);
  const cartItemsCount = cartItems ? cartItems.length : 0;
  return {
    cart,
    cartItemsCount,
    currency: currency || '',
    subtotalCost: subtotalCost || 0,
    taxAmount: taxAmount || 0,
    totalCost: totalCost || 0,
  };
}

export async function doCartComplete() {
  dispatch(sliceCartPayment.actions.doCardComplete());
  await cartAndCookie().then(() => location.reload());
}

export function initMerchiCart(domainId: number) {
  getMerchiCart(domainId);
  if ((window as any) && (window as any) !== undefined) {
    (window as any).getCart = () => getMerchiCart(domainId);
    (window as any).isMerchiCartFetching = isMerchiCartFetching;
    (window as any).getMerchiCartValues = getMerchiCartValues;
  }
}
