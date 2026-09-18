import { isBrowser } from "browser-or-node";
import { cartCookieName, readTestCheckoutFlag } from "./test_checkout";

export async function getCookie(name: string, defaultValue: any) {
  if (!isBrowser) {
    return '';
  }
  const searchPrefix = name + '=';
  const cookies = document.cookie.split(';');
  let i;
  let cookie;
  for (i = 0; i < cookies.length; ++i) {
    cookie = cookies[i];
    cookie = cookie.replace(/^\s*/, '');
    if (cookie.indexOf(searchPrefix) === 0) {
      return cookie.substring(searchPrefix.length, cookie.length);
    }
  }
  if (defaultValue === undefined) {
    throw 'no such cookie present';
  } else {
    return defaultValue;
  }
}

export async function getCartCookie(domainId: number | string, isTest?: boolean) {
  const test = isTest ?? readTestCheckoutFlag();
  const idAndToken: string = await getCookie(cartCookieName(domainId, test), null);
  return idAndToken ? idAndToken.split(',') : null;
}

export async function getCartCookieToken(domainId: number | string, isTest?: boolean) {
  const cartIdAndToken = domainId ? await getCartCookie(Number(domainId), isTest) : undefined;
  return cartIdAndToken && cartIdAndToken[1] || undefined;
}

async function setSessionCookie(name: string, value: any, domain?: any) {
  if (!isBrowser) {
    return;
  }
  let cookie = name + '=' + value;
  if (!!domain) {
    // remove port, if it exists
    let n = domain.indexOf(':');
    domain = domain.substring(0, n != -1 ? n : domain.length);
    // remove trailing slash and path, if they exists
    n = domain.indexOf('/');
    domain = domain.substring(0, n != -1 ? n : domain.length);
    cookie += '; Domain=' + domain;
  } else {
    cookie += '; Domain=' + '.' + (location as any).hostname;
  }
  cookie += '; path=/';
  document.cookie = cookie;
}

export const setCartCookie = async (storeId: number, cart: any, domain?: any, isTest?: boolean) => {
  const test = isTest ?? (cart ? Boolean(cart.isTest) : readTestCheckoutFlag());
  const cookieValue = cart ? cart.id + ',' + cart.token : '';
  await setSessionCookie(cartCookieName(storeId, test), cookieValue, domain);
};
