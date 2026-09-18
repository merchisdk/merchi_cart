import * as React from 'react';
import { useEffect, useState } from 'react';
import { StripePaymentForm, StripePaymentGate } from 'merchi_invoice';
import LegacyStripeCardForm from './LegacyStripeCardForm';
import { completeTestPayment, fetchTestPublishableKey } from './actions';
import { useCartContext } from '../CartProvider';
import { tabIdPaymentSuccess } from '../utilities/tabs';
import { TEST_CARD_NUMBER } from '../utilities/test_checkout';

const testCheckoutHint = (
  <div style={{marginBottom: '12px'}}>
    <div style={{color: 'red', fontWeight: 600}}>Test checkout</div>
    <p style={{margin: '4px 0 0', fontSize: '13px'}}>
      No real charge. Use card {TEST_CARD_NUMBER}, any future expiry, any CVC,
      any ZIP.
    </p>
  </div>
);

export default function StripeCardForm() {
  const {
    alertError,
    apiUrl,
    cart,
    classNameBtnPay,
    setActiveTabIndex,
    setInvoiceJson,
  } = useCartContext();
  const isTestCheckout = Boolean(cart.isTest);
  const url = apiUrl || 'https://api.merchi.co/v6/';
  const [testKeyMissing, setTestKeyMissing] = useState(false);
  const [loadingTestPayment, setLoadingTestPayment] = useState(false);

  useEffect(() => {
    if (!isTestCheckout) {
      setTestKeyMissing(false);
      return;
    }
    fetchTestPublishableKey(url)
      .then(() => setTestKeyMissing(false))
      .catch(() => setTestKeyMissing(true));
  }, [isTestCheckout, url]);

  async function doCompleteTestPayment() {
    setLoadingTestPayment(true);
    try {
      const invoice = await completeTestPayment(url, cart);
      setInvoiceJson(invoice);
      setActiveTabIndex(tabIdPaymentSuccess);
    } catch (e: any) {
      alertError(e.message);
    } finally {
      setLoadingTestPayment(false);
    }
  }

  if (isTestCheckout && testKeyMissing) {
    return (
      <>
        {testCheckoutHint}
        <p style={{fontSize: '13px', marginBottom: '12px'}}>
          Stripe test keys are not configured. Complete this as a test order
          without a card.
        </p>
        <button
          type='button'
          className={classNameBtnPay}
          disabled={loadingTestPayment}
          onClick={doCompleteTestPayment}
        >
          {loadingTestPayment ? 'Completing…' : 'Complete test order'}
        </button>
      </>
    );
  }

  return (
    <>
      {isTestCheckout && testCheckoutHint}
      <StripePaymentGate
        engine={isTestCheckout ? 'legacy' : cart.stripePaymentEngine}
        apiUrl={url}
        resource="cart"
        resourceId={cart.id}
        resourceToken={cart.token || cart.cartToken}
        legacy={<LegacyStripeCardForm />}
      >
        <StripePaymentForm
          apiUrl={url}
          resource="cart"
          resourceId={cart.id}
          resourceToken={cart.token || cart.cartToken}
          onError={alertError}
          onSuccess={invoice => {
            setInvoiceJson(invoice);
            setActiveTabIndex(tabIdPaymentSuccess);
          }}
        />
      </StripePaymentGate>
    </>
  );
}
