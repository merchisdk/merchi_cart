export const TEST_CHECKOUT_QUERY = 'merchi_test_checkout';
export const TEST_CHECKOUT_STORAGE_KEY = 'merchi_test_checkout';
export const TEST_CARD_NUMBER = '4242 4242 4242 4242';

export function readTestCheckoutFlag(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get(TEST_CHECKOUT_QUERY) === '1') {
      window.localStorage.setItem(TEST_CHECKOUT_STORAGE_KEY, '1');
      return true;
    }
    return window.localStorage.getItem(TEST_CHECKOUT_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function persistTestCheckoutFlag(): boolean {
  return readTestCheckoutFlag();
}

export function cartCookieName(domainId: number | string, isTest = false): string {
  return isTest ? `cart-${domainId}-test` : `cart-${domainId}`;
}
