import { batch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
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
import { Merchi } from 'merchi_sdk_ts';
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
import { makeProduct } from './utilities/product';
import {
  makeUser,
  createNewCustomer,
  tryReturningCustomerEmail,
} from './utilities/user';
import { appendStyleSheetText } from './utilities/helpers';
import { makeJob } from './utilities/job';

const merchi = new Merchi();

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
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
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
  patchCart,
  patchCartDone,
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
      dispatch(sliceCartItem.actions.setCartItem({ cartItem, index }));
    } else {
      setActiveTab(tabIdItems);
      dispatch(sliceCartItem.actions.setCartItem({ cartItem: null, index }));
    }
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


// Fetch the associated cart theme via the cart domain.
export async function actionFetchTheme(id: number) {
  dispatch(fetchTheme())
  try {
    const domain = await merchi.Domain.get(id, {embed: {activeTheme: {mainCss: {}}}});
    const theme = domain.activeTheme;
    await appendStyleSheetText(theme.mainCss, () => dispatch(fetchThemeSuccess()));
  } catch (e: any) {
    alertError(e.errorMessage || e.message || 'Error fetching domain theme.');
    dispatch(fetchThemeError());
  }
}

// Create cart and save cart cookie
async function cartAndCookie(domainId: number) {
  try {
    const cart = makeCart({domain: {id: domainId}}, true);
    await cart.create({embed: cartEmbed});
    const cartJson = await cart.toJson();
    if (domainId) {
      setCartCookie(Number(domainId), cartJson, undefined);
    }
    dispatch(fetchCartSuccess(cartJson));
    return cartJson;
  } catch (e: any) {
    alertError(e.errorMessage || e.message || 'Unable to fetch cart.');
    dispatch(fetchCartError());
  }
}

export async function createAndSetNewCartCookie(domainId: number) {
  dispatch(fetchCart());
  await cartAndCookie(domainId);
}

export async function doClearCart() {
  const { domainId } = getStore().stateCart;
  dispatch(setCart({}));
  closeClearCart();
  await createAndSetNewCartCookie((domainId as any));
}

// This action tajkes job json from the product from and creates a
// cart item, which is then attached to the cart.
export async function addCartItem(
  jobJson: any,
  onSuccess: (cartItem: any) => void,
  onError: (e: any) => void,
) {
  const jobEnt = makeJob(jobJson, true);
  const data = getStore();
  const cartToken = await getCartToken();
  const { cart } = data.stateCart;
  const cartEnt = makeCart(cart, false, cartToken);
  const cartItemEnt = makeCartItem({}, true);
  const cartItemProduct = makeProduct({ id: (jobEnt.product as any).id });
  cartItemEnt.cart = cartEnt;
  cartItemEnt.quantity = jobEnt.quantity;
  cartItemEnt.product = cartItemProduct;
  cartItemEnt.variations = jobEnt.variations;
  cartItemEnt.variationsGroups = jobEnt.variationsGroups;
  cartItemEnt.taxType = jobEnt.taxType;
  try {
    const item = await cartItemEnt.create();
    const itemJson = await item.toJson();
    onSuccess(itemJson);
  } catch(e: any) {
    onError(e);
  }
}

async function refetchCart(cartEnt: any) {
  merchi.cartToken = cartEnt.token;
  await merchi.Cart.get(cartEnt.id, {embed: cartEmbed}).
    then(convertToJson).
    then(updateCartValues)
}

function cleanVariation(variation: any) {
  const { variationField = {} } = variation;
  return {
    ...variation,
    id: variation.id,
    value: variation.value,
    variationField: {id: variationField.id},
    variationFiles: variation.variationFiles.map((f: any) => ({id: f.id})),
  };
}

function cleanVariationGroups(variationsGroup: any) {
  const { id, quantity = 0, variations = [] } = variationsGroup;
  return {
    id,
    quantity,
    variations: variations?.map(cleanVariation),
  };
}

// This action patches the cart item
export async function actionCartItemEdit(cartItem: any) {
  dispatch(sliceCartItem.actions.patchCartItem());
  const data = getStore();
  const cartToken = await getCartToken();
  const { cart } = data.stateCart;
  const { cartItem: stateCartItem } = data.stateCartItem;
  try {
    const {
      product,
      quantity = 0,
      taxType,
      variations = [],
      variationsGroups = [],
    } = cartItem;

    const cartItemEnt = makeCartItem({
      ...cartItem,
      id: (stateCartItem as any).id,
      cart: {id: (cart as any).id},
      product: product ? {id: product.id} : undefined,
      taxType: taxType ? {id: taxType.id} : undefined,
      quantity,
      variations: variations.map(cleanVariation),
      variationsGroups: variationsGroups.map(cleanVariationGroups),
    }, true, cartToken);

    // Save changes to the Cart Item
    await cartItemEnt.save();

    // Refetch the Cart and all it's relationships
    await refetchCart({...cart});

    // Show success alert
    alertSuccess('Item updated.');

    // Stop loading
    dispatch(sliceCartItem.actions.patchCartItemSuccess());

    // Set active Cart tab
    setActiveTab(tabIdItems);

    // Clear Cart Item from state
    setCartItem({}, 0);
  } catch (e: any) {
    alertError(e.errorMessage || e.message || 'Unable to edit Cart Item.');
    dispatch(sliceCartItem.actions.patchCartItemError());
  };
}

// Delete an item from the cart by index
export async function actionDeleteCartItem(index: number) {
  const data = getStore();
  const cartToken = await getCartToken();
  const { cart } = data.stateCart;
  try {
    const cartEnt = makeCart(cart, false, cartToken);
    const cartItems = (cartEnt as any).cartItems;
    cartItems.splice(index, 1);
    (cartEnt as any).cartItems = cartItems;
    dispatch(deleteCartItem(index));
    const r = await cartEnt.save({embed: cartEmbed});
    const cartJson = r.toJson();
    dispatch(deleteCartItemSuccess(cartJson));
  } catch(e: any) {
    alertError(e.errorMessage || e.message || 'Unable to remove item from cart.');
    dispatch(deleteCartItemError());
  }
}

// Patch the clients 
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

// Save the client shipment address and then opens next tab
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

// Patch cart
export async function actionPatchCart(cartJson: any) {
  const cartToken = await getCartToken();
  const cartEnt = makeCart({cartJson}, true, cartToken);
  dispatch(patchCart());
  try {
    const cart = await cartEnt.save({embed: cartEmbed});
    dispatch(setCart(cart.toJson()));
  } catch (e: any) {
    alertError(e.errorMessage || e.message || 'nknown server error.');
  } finally {
    dispatch(patchCartDone());
  }
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

async function attachClientToCart(clientJson: any) {
  try {
    const cartToken = await getCartToken();
    const { cart } = getStore().stateCart;
    const clientEnt = makeUser({id: clientJson.id});
    const cartEnt = makeCart({...cart}, false, cartToken);
    cartEnt.client = clientEnt;
    const r = await cartEnt.save({embed: cartEmbed});
    const cartJson = r.toJson();
    dispatch(setCart(cartJson));
    dispatch(sliceNewCustomerForm.actions.createNewCustomerSuccess());
  } catch (e: any) {
    throw e;
  }
}

// This action is used to check if a users already exists in Merchi and
// attaches them to the cart if they do
export async function tryReturningCustomer(emailAddress: string) {
  dispatch(sliceFormReturningCustomer.actions.tryReturningCustomer());
  try {
    const user: any = await tryReturningCustomerEmail(emailAddress);
    await attachClientToCart({
      emailAddresses: [{emailAddress}],
      id: user.user_id,
    });
    dispatch(sliceFormReturningCustomer.actions.tryReturningCustomerSuccess());
  } catch(e: any) {
    alertError(e.errorMessage);
    dispatch(sliceFormReturningCustomer.actions.tryReturningCustomerError());
    dispatch(sliceFormReturningCustomer.actions.setReturningCustomerError(true));
  };
}

// This action attaches creates a new client and attaches them to the cart
export async function actionCreateNewCustomer(customerJson: any) {
  const { cart } = getStore().stateCart;
  const domainId = cart && (cart as any).domain && (cart as any).domain.id;
  dispatch(sliceNewCustomerForm.actions.createNewCustomer());
  try {
    const r = await createNewCustomer(
      {...customerJson, registeredUnderDomains: [{id: domainId}]}
    );
    const { user } = r;
    await attachClientToCart(user);
    dispatch(sliceNewCustomerForm.actions.createNewCustomerSuccess());
  } catch (e: any) {
    const msg = e.errorMessage || e.message || 'Unable to attach client to cart.';
    alertError(msg);
    dispatch(sliceNewCustomerForm.actions.createNewCustomerError(msg));
  };
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

async function getCart(domainId: number, cartIdAndToken: Array<string>) {
  const {
    cartSettingsInvalid,
  } = sliceCart.actions;
  const id = Number(cartIdAndToken[0]);
  if (cartIdAndToken[1]) {
    merchi.cartToken = cartIdAndToken[1];
  }
  dispatch(fetchCart());
  try {
    const cart = await merchi.Cart.get(id, {embed: cartEmbed});
    const cartJson = await cart.toJson();
    if (stripeIsValidAndActive(cartJson)) {
        updateCartValues(cartJson);
    } else {
      console.error(
        `MErhci cart error: Stripe payment ` +
        `options have not been correctly set up. ` +
        `Check the company profile payment options tab ` +
        `to set and edit stripe payment options.`);
      dispatch(cartSettingsInvalid());
    }
  } catch(e: any){
    createAndSetNewCartCookie(domainId);
  }
}

export async function actionGetMerchiCart(domainId: number) {
  const cartIdAndToken = await getMerchiCartCookie(domainId);
  if (cartIdAndToken) {
    getCart(domainId, cartIdAndToken);
  } else {
    createAndSetNewCartCookie(domainId);
  }
}

export function toggleCartOpen() {
  dispatch(sliceCart.actions.toggleCartOpen());
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
  const domainId: any = getStore().stateCart.domainId;
  dispatch(sliceCartPayment.actions.doCardComplete());
  await cartAndCookie(domainId).then(() => location.reload());
}

export function initMerchiCart(domainId: number) {
  dispatch(setDomainId(domainId));
  actionGetMerchiCart(domainId);
  if ((window as any) && (window as any) !== undefined) {
    (window as any).getCart = () => actionGetMerchiCart(domainId);
    (window as any).isMerchiCartFetching = isMerchiCartFetching;
    (window as any).getMerchiCartValues = getMerchiCartValues;
    (window as any).toggleCartOpen = toggleCartOpen;
  }
}

interface PropsMerchiCartFetchAndSet {
  cartJson: any;
}

export async function merchiCartFetchAndSet(cartJson: PropsMerchiCartFetchAndSet) {
  await refetchCart(cartJson);
}
