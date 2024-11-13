import * as React from 'react';
import { useEffect, useState } from 'react';
import { ButtonPay } from '../buttons';
import FormStripeCardFields from './StripeCardFields';
import {
  stripeCardFormSubmit,
  stripeInitPromise,
  stripePaymentButtonSubmit,
} from './actions';
import { PaymentRequestPaymentMethodEvent } from '@stripe/stripe-js';
import { companyStripePubKeyOrTestPubKey } from './utils';
import { useCartContext } from '../CartProvider';
import { tabIdPaymentSuccess } from '../utilities/tabs';

function PaymentButton({ loading }: any) {
  const { cart } = useCartContext();
  return (
    <div>
      <ButtonPay cart={cart} loading={loading} />
    </div>
  );
}

const badgeTestMode = <div style={{color: 'red'}}>Test mode</div>;

function StripeCardForm() {
  const { alertError, apiUrl, cart, setActiveTabIndex, setInvoiceJson } = useCartContext();
  const { domain } = cart;
  const [error, setError] = useState(({} as any));
  const company = domain.company;
  const hasCompanyPubKey = Boolean(company.isStripeValid && companyStripePubKeyOrTestPubKey(company));
  const companyPubKey = hasCompanyPubKey ? companyStripePubKeyOrTestPubKey(company) : '';
  const canUseConnect = !!company.stripeAccountId;
  const [loadingStripePayment, setLoadingStripePayment] = useState(false);
  const [loadingStripePaymentButtons, setLoadingStripePaymentButtons] = useState(false);
  const url: string = apiUrl || '';
  function callbackCreditCardPaymentSuccess(invoiceJson: any) {
    setInvoiceJson(invoiceJson);
    setActiveTabIndex(tabIdPaymentSuccess);
  }
  async function doStripePayment(r: any) {
    setLoadingStripePayment(true);
    setError({});
    try {
      const response = await stripeCardFormSubmit(url, r.stripe, r.card, cart);
      callbackCreditCardPaymentSuccess(response);
      setLoadingStripePayment(false);
    } catch (e: any) {
      setLoadingStripePayment(false);
      alertError(e.message);
      setError({message: e.errorMessage || e.message || 'Unable to process card.'});
    }
  }
  async function doStripePaymentRequestForButton(
    stripe: any, event: PaymentRequestPaymentMethodEvent
  ) {
    setLoadingStripePaymentButtons(true);
    setError({});
    try {
      const response = await stripePaymentButtonSubmit(url, stripe, cart, event);
      callbackCreditCardPaymentSuccess(response);
      setLoadingStripePaymentButtons(false);
    } catch (e: any) {
      setLoadingStripePaymentButtons(false);
      alertError(e.message);
      setError({message: e.errorMessage || e.message || 'Unable to process card.'});
    }
  }
  const [stripePublicKey, setStripePublicKey] = useState(companyPubKey);
  useEffect(() => {
    if (!stripePublicKey && canUseConnect) stripeInitPromise(url).then(setStripePublicKey)
  }, [stripePublicKey, canUseConnect]);
  return (
    <>
      {company.isTesting && badgeTestMode}
      <FormStripeCardFields
        doStripePayment={doStripePayment}
        doStripePaymentRequestForButton={doStripePaymentRequestForButton}
        cart={cart}
        error={error}
        loadingStripePayment={loadingStripePayment}
        loadingStripePaymentButtons={loadingStripePaymentButtons}
        PaymentButton={PaymentButton}
        setLoadingStripePayment={setLoadingStripePayment}
        stripePubKey={stripePublicKey}
      />
    </>
  );
}

export default StripeCardForm;
