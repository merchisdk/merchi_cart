import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import sliceFacebookLogin from '../login/slices/sliceFacebookLogin';
import {
  sliceCart,
  tabIdCheckout,
  tabIdItem,
  tabIdItems,
  tabIdPaymentSuccess,
} from './slices/sliceCart';
import { sliceCartAlert } from './slices/slice_cart_alert';
import sliceCartItem, { createQuoteCartItem } from './slices/sliceCartItem';
import { sliceCartPayment } from './slices/slice_cart_payment';
import { sliceCartShipment } from './slices/slice_cart_shipment';
import { sliceNewCustomerForm } from '../sign_up_customer/slice';
import sliceGoogleGeoComplete from '../address_components/slices/sliceGoogleGeoComplete';
import sliceFormReturningCustomer from '../forms/slices/sliceFormReturningCustomer';
import reducersSquare from '../square/slices/reducersSquare';
import sliceStripeCardForm from '../stripe/slices/sliceStripeCardForm';
import slicePublicInvoice from '../public_invoice/slices/slicePublicInvoice';
import {
  actionGeneratePublicInvoicePdf,
  actionGeneratePublicInvoiceReceiptPdf
} from '../public_invoice/actions';
import { Merchi } from 'MerchiSDK/merchi';
import { platformName } from 'MerchiSDK/constants/platform';
import { batch } from 'react-redux';
import { cartEmbed } from '../embed-utility';
import { makeAddress } from '../ts_helpers/address';
import {
  getCartCookie as getMerchiCartCookie,
  setCartCookie,
} from '../ts_helpers/cookie';
import {
  getCartShipmentGroupsAndQuotes,
  makeCart,
  makeCartItem,
  makeCartShipmentQuote,
  stripeIsValidAndActive,
} from '../ts_helpers/cart';
import {
  currentUserTsEntity,
  makeUser,
  tryReturningCustomerEmail,
} from '../ts_helpers/user';
import { appendStyleSheetText } from '../utilities';

const merchi = new Merchi();

const middleware = getDefaultMiddleware({ serializableCheck: false });

export const store = configureStore({
  middleware: [...middleware],
  reducer: {
    cartAlertState: sliceCartAlert.reducer,
    cartItemState: sliceCartItem.reducer,
    cartPaymentState: sliceCartPayment.reducer,
    cartShipmentState: sliceCartShipment.reducer,
    stateCart: sliceCart.reducer,
    newCustomerFormState: sliceNewCustomerForm.reducer,
    stateGoogleGeoComplete: sliceGoogleGeoComplete.reducer,
    stateFacebookLogin: sliceFacebookLogin.reducer,
    stateFormReturningCustomer: sliceFormReturningCustomer.reducer,

    statePublicInvoice: slicePublicInvoice.reducer,

    // Square slices
    ...reducersSquare,

    // Stripe slices
    ...sliceStripeCardForm,
  },
});

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
  setDomainId,
  setCartShipmentGroups,
} = sliceCart.actions;

const {
  cartItemFetchQuote,
  cartItemFetchQuoteError,
  cartItemFetchQuoteSuccess,
} = sliceCartItem.actions;

async function getCartToken() {
  const { domainId } = store.getState().stateCart;
  const cartIdAndToken = domainId ? await getMerchiCartCookie(Number(domainId)) : undefined;
  return cartIdAndToken && cartIdAndToken[1] ? cartIdAndToken[1] : undefined;
}

function dispatch(method: any) {
  store.dispatch(method);
}

export function setCartClient(client: any) {
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

export function dispatchCartSliceReducer(reducerKey: string) {
  const action = (sliceCart as any).actions[reducerKey];
  dispatch(action());
}

export function toggleCartOpen() {
  dispatchCartSliceReducer('toggleCartOpen');
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

export function generateInvoicePdf() {
  actionGeneratePublicInvoicePdf(store, alertError);
}

export function generateInvoiceReceiptPdf() {
  actionGeneratePublicInvoiceReceiptPdf(store, alertError);
}

export function actionFetchTheme(id: number) {
  dispatch(fetchTheme())
  merchi.Domain.get(id, {embed: {activeTheme: {mainCss: {}}}}).
    then((domain: any) => {
      const activeTheme = domain.activeTheme;
      appendStyleSheetText(
      	activeTheme.mainCss,
      	() => dispatch(fetchThemeSuccess()));
    }).
    catch((e: any) => {
      alertError(e.errorMessage);
      dispatch(fetchThemeError());
    });
}

async function cartAndCookie() {
  const currentUser = currentUserTsEntity();
  const { domainId } = store.getState().stateCart;
  const cart = makeCart({domain: {id: domainId}}, true);
  cart.client = currentUser ? currentUser : null;
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
  dispatch(sliceCart.actions.setCart({}));
  closeClearCart();
  await createAndSetNewCartCookie();
}

export async function cartItemQuoteUpdate(action: any) {
  const { job } = action;
  const state = store.getState();
  const cartToken = await getCartToken();
  const { cartItem } = state.cartItemState;
  const cartItemEnt = makeCartItem(cartItem, false, cartToken);
  const cartItemQuote = createQuoteCartItem(
    cartItem,
    job,
    cartItemEnt,
  );
  dispatch(cartItemFetchQuote());
  cartItemQuote.calculate().
    then((cI: any) => dispatch(cartItemFetchQuoteSuccess({cartItem: cI.toJson()}))).
    catch((e: any) => {
      batch(() => {
        dispatch(cartItemFetchQuoteError());
        alertError(e.errorMessage);
      });
    });
}

export async function patchCartItem(cartItem: any) {
  const data = store.getState();
  const {
    patchCartItem: doPatch,
    patchCartItemError: doPatchError,
    patchCartItemSuccess: doPatchSuccess,
  } = sliceCartItem.actions;
  const { setCart } = sliceCart.actions;
  const cartToken = await getCartToken();
  const {
    stateCart: { cart },
    cartItemState: { cartItem: stateCartItem, index }
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
  const data = store.getState();
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
    cartShipmentState: { receiverAddress: address },
  } = store.getState();
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
  const { setCart } = sliceCart.actions;
  const cartToken = await getCartToken();
  const { stateCart: { cart } } = store.getState();
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
  const { setCart } = sliceCart.actions;
  const {
    createNewCustomerSuccess: createNewSuccess,
  } = sliceNewCustomerForm.actions;
  const cartToken = await getCartToken();
  const { stateCart: { cart } } = store.getState();
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
  const { setCart } = sliceCart.actions;
  const cartToken = await getCartToken();
  const { stateCart: { cart } } = store.getState();
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

export function tryReturningCustomer(data: any) {
  const { emailAddress } = data;
  const {
    setReturningCustomerError,
    tryReturningCustomer: tryReturning,
    tryReturningCustomerError,
    tryReturningCustomerSuccess,
  } = sliceFormReturningCustomer.actions;
  const error = (e: any) =>
    batch(() => {
      alertError(e.errorMessage);
      dispatch(tryReturningCustomerError());
      dispatch(setReturningCustomerError(true));
    });
  dispatch(tryReturning());
  tryReturningCustomerEmail(emailAddress).
    then((r: any) => {
      attachClientToCart({
        emailAddresses: [{emailAddress}],
        id: r.user_id,
      }).
        then(() => dispatch(tryReturningCustomerSuccess()))
        .catch(error);
    }).
    catch(error);
}

export function createNewCustomer(customerJson: any) {
  const { cart } = store.getState().stateCart;
  const {
    createNewCustomer: createNew,
    createNewCustomerError: createNewError,
    createNewCustomerSuccess: createNewSuccess,
  } = sliceNewCustomerForm.actions;
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
  merchi.authenticatedFetch(
    '/public_user_create/', {body: user.toFormData(), method: 'POST'}
  ).then(
    (r: any) => {
      const { user: userJson } = r;
      attachClientToCart(userJson);
    }
  ).then(
    () => dispatch(createNewSuccess())
  ).catch(error);
}

export function facebookLoginSuccess(merchiJsSdkUser: any) {
  const {
    setReturningCustomerError,
    tryReturningCustomerError,
  } = sliceFormReturningCustomer.actions;
  const p = merchiJsSdkUser.primaryPhoneNumberEntity();
  const e = merchiJsSdkUser.primaryEmailAddressEntity();
  const emailAddresses = e ?
    [{emailAddress: e.emailAddress(),
      id: e.id()}] : undefined;
  const phoneNumbers = p ?
    [{code: p.code(),
      id: p.id(),
      number: p.number()}] : undefined;
  const error = (e: any) =>
    batch(() => {
      alertError(e.errorMessage);
      dispatch(tryReturningCustomerError());
      dispatch(setReturningCustomerError(true));
    });
  attachClientToCart({
    id: merchiJsSdkUser.id(),
    name: merchiJsSdkUser.name(),
    emailAddresses,
    phoneNumbers,
  }).catch(error);
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
         `${platformName} cart error: Stripe payment ` +
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

async function getCartCookieThenGetCart(domainId: number) {
  const cartIdAndToken = await getMerchiCartCookie(domainId);
  dispatch(setDomainId({ cartIdAndToken, domainId }));
  if (cartIdAndToken) {
    getCart(cartIdAndToken);
  } else {
    createAndSetNewCartCookie();
  }
}

export async function doCartComplete() {
  dispatch(sliceCartPayment.actions.doCardComplete());
  await cartAndCookie().then(() => location.reload());
}

export async function toggleCart() {
  const cartToken = await getCartToken();
  const { cart, modalCartOpen } = store.getState().stateCart;
  const { id } = (cart as any);
  toggleCartOpen();
  if (!modalCartOpen) {
    getCart([id, cartToken]);
  }
}

export function initMerchiCart(domainId: number) {
  getCartCookieThenGetCart(domainId);
  (window as any).getCart = () => getCartCookieThenGetCart(domainId);
  (window as any).isMerchiCartFetching = () =>
    store.getState().stateCart.fetchingCart;
  (window as any).openCart = toggleCartOpen;
  (window as any).openMerchiCart = toggleCartOpen;
  (window as any).getMerchiCartValues = () => {
    const { cart } = store.getState().stateCart;
    const { cartItems, currency, subtotalCost, taxAmount, totalCost } = (cart as any);
    const cartItemsCount = cartItems ? cartItems.length : 0;
    return {
      cart,
      cartItemsCount,
      currency: currency ? currency : '',
      subtotalCost: subtotalCost ? subtotalCost : 0,
      taxAmount: taxAmount ? taxAmount : 0,
      totalCost: totalCost ? totalCost : 0,
    };
  };
  (window as any).cartItemAddedToCart = toggleCart;
}
