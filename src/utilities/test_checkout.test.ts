import {
  TEST_CARD_NUMBER,
  TEST_CHECKOUT_QUERY,
  TEST_CHECKOUT_STORAGE_KEY,
  cartCookieName,
  readTestCheckoutFlag,
} from './test_checkout';

describe('test checkout helpers', () => {
  const originalLocation = window.location;

  beforeEach(() => {
    window.localStorage.clear();
    delete (window as any).location;
    (window as any).location = { search: '' };
  });

  afterEach(() => {
    (window as any).location = originalLocation;
    window.localStorage.clear();
  });

  it('builds a separate cookie name for test carts', () => {
    expect(cartCookieName(12)).toBe('cart-12');
    expect(cartCookieName(12, true)).toBe('cart-12-test');
  });

  it('persists the query flag and exposes the test card number', () => {
    (window as any).location = { search: `?${TEST_CHECKOUT_QUERY}=1` };
    expect(readTestCheckoutFlag()).toBe(true);
    expect(window.localStorage.getItem(TEST_CHECKOUT_STORAGE_KEY)).toBe('1');
    expect(TEST_CARD_NUMBER).toBe('4242 4242 4242 4242');
  });

  it('reads the stored flag when the query is absent', () => {
    window.localStorage.setItem(TEST_CHECKOUT_STORAGE_KEY, '1');
    expect(readTestCheckoutFlag()).toBe(true);
  });
});
