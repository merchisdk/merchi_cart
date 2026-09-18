import { completeTestPayment, fetchTestPublishableKey } from './actions';

describe('test checkout stripe actions', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('loads the master test publishable key', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ key: 'pk_test_master' }),
    }) as any;

    await expect(fetchTestPublishableKey('https://api.test/v6/')).resolves.toBe(
      'pk_test_master'
    );
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.test/v6/stripe/test_publishable_key/',
      { method: 'GET', mode: 'cors' }
    );
  });

  it('fails over when the test-key request is rejected', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'missing' }),
    }) as any;

    await expect(fetchTestPublishableKey('https://api.test/v6/')).rejects.toThrow(
      'Stripe test keys are not configured'
    );
  });

  it('completes a no-Stripe test payment with the cart token', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ invoice: { id: 9, isTest: true } }),
    }) as any;

    await expect(
      completeTestPayment('https://api.test/v6/', { id: 4, token: 'tok' })
    ).resolves.toEqual({ id: 9, isTest: true });
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.test/v6/carts/4/complete_test_payment/?cart_token=tok',
      { method: 'POST', mode: 'cors' }
    );
  });
});
