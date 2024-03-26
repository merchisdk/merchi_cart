import { Merchi } from 'merchi_sdk_ts';
import { companyStripePubKeyOrTestPubKey } from './company';

const merchi = new Merchi();

export const makeCart = (json: any, makeDirty?: boolean, cartToken?: string) => {
  const merchi = new Merchi();
  if (cartToken) merchi.cartToken = cartToken;
  const cart = new merchi.Cart();
  return cart.fromJson(json, { makeDirty });
};

export const makeCartItem = (cartItemJson: any, makeDirty?: boolean, cartToken?: string) => {
  const merchi = new Merchi();
  if (cartToken) merchi.cartToken = cartToken;
  const cartItem = new merchi.CartItem();
  return cartItem.fromJson(cartItemJson, { makeDirty });
};

export function makeCartShipmentQuote(json: any, makeDirty?: boolean) {
  const cartShipmentQuote = new merchi.CartShipmentQuote();
  return cartShipmentQuote.fromJson(json, { makeDirty });
}

export function cartHasSelectedQuotes(cart: any) {
  const { shipmentGroups = [] } = cart;
  if (shipmentGroups.length) {
    const selected = shipmentGroups.filter((g: any) => !!g.selectedQuote);
    return selected.length === shipmentGroups.length;
  }
  return false;
}

export async function getCartShipmentGroupsAndQuotes(cart: any) {
  const query: Array<any> = [];
  query.push(['cart_token', cart.token]);
  return merchi.authenticatedFetch(
    `/generate-cart-shipment-quotes/${cart.id}/`,
    {method: 'GET', query});
}

function cartCompany(cart: any) {
  return cart && cart.domain && cart.domain.company ?
    cart.domain.company : null;
}

export function hasStripeLegacyAccount(cart: any) {
  const company = cartCompany(cart);
  return Boolean(company && companyStripePubKeyOrTestPubKey(company));
}

function hasStripeConnectAccount(cart: any) {
  const company = cartCompany(cart);
  return Boolean(company && company.isStripeAccountEnabled); 
}

export function stripeIsValidAndActive(cart: any) {
  const company = cartCompany(cart);
  const hasStripe = hasStripeLegacyAccount(cart) ||
    hasStripeConnectAccount(cart);
  return Boolean(hasStripe && company && company.acceptStripe);
}

export function cartRequiresShipment(cart: any) {
  const { cartItems = [] } = cart;
  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    if (item && item.product && item.product.needsShipping) {
      return true;
    }
  }
  return false;
}
