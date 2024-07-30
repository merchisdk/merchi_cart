import * as React from 'react';
import StripePaymentButtons from './StripePaymentButtons';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import {
  loadStripe,
  PaymentRequestPaymentMethodEvent,
} from '@stripe/stripe-js';
import { CARD_ELEMENT_OPTIONS } from './utils';
import pngStripe from '../assets/stripe-payment-secure.png';

type DoStripePaymentRequestForButton = (
  stripe: any,
  event: PaymentRequestPaymentMethodEvent
) => void;

interface FormProps {
  doStripePayment: (values: any) => void;
  doStripePaymentRequestForButton?: DoStripePaymentRequestForButton;
  cart: any;
  error: any;
  loadingStripePayment: boolean;
  loadingStripePaymentButtons: boolean;
  PaymentButton?: any;
  setLoadingStripePayment: (loading: boolean) => void;
}

function InnerForm({
  doStripePayment,
  doStripePaymentRequestForButton,
  cart,
  error,
  loadingStripePayment,
  loadingStripePaymentButtons,
  PaymentButton,
  setLoadingStripePayment,
}: FormProps) {
  const inputClass = 'form-control p-t-8 stripe-form-control';
  const stripe = useStripe();
  const elements = useElements();
  function paymentStart(e: any) {
    const card = (elements as any).getElement(CardNumberElement) as any;
    setLoadingStripePayment(true);
    e.preventDefault();
    if (!stripe || !elements) {
      setLoadingStripePayment(false);
      return;
    }
    doStripePayment({ card, cart, stripe });
  }
  return (
    <>
      {loadingStripePaymentButtons ? (
        <div style={{ alignItems: 'center' }}>
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '1rem',
              textAlign: 'center',
            }}
          >
            <div className='spinner-merchi-small' />
          </div>
          <p style={{ fontSize: '14px', fontWeight: 600, textAlign: 'center' }}>
            Processing payment
          </p>
        </div>
      ) : (
        <>
          {!!(cart && doStripePaymentRequestForButton) && (
            <StripePaymentButtons
              doPaymentRequest={(event: PaymentRequestPaymentMethodEvent) =>
                (
                  doStripePaymentRequestForButton as DoStripePaymentRequestForButton
                )(stripe, event)
              }
              cart={cart}
            />
          )}
          <form onSubmit={paymentStart}>
            <div className='merchi-cart-stripe-input-container'>
              <CardNumberElement
                className={inputClass}
                {...CARD_ELEMENT_OPTIONS}
              />
              <CardExpiryElement
                className={inputClass}
                {...CARD_ELEMENT_OPTIONS}
              />
              <CardCvcElement
                className={inputClass}
                {...CARD_ELEMENT_OPTIONS}
              />
              {error.message && (
                <div className='merchi-cart-stripe-input-error'>
                  {error.message}
                </div>
              )}
              <PaymentButton loading={loadingStripePayment} />
              {pngStripe.src && (
                <img
                  src={pngStripe.src}
                  width={250}
                  alt='Secure credit card payments by Stripe'
                />
              )}
            </div>
          </form>
        </>
      )}
    </>
  );
}

interface Props {
  doStripePayment: (values: any) => void;
  doStripePaymentRequestForButton?: (
    stripe: any,
    event: PaymentRequestPaymentMethodEvent
  ) => void;
  cart: any;
  error: any;
  loadingStripePayment: boolean;
  loadingStripePaymentButtons: boolean;
  PaymentButton?: any;
  setLoadingStripePayment: (loading: boolean) => void;
  stripePubKey: string;
}

function FormStripeCardFields({
  doStripePayment,
  doStripePaymentRequestForButton,
  cart,
  error,
  loadingStripePayment,
  loadingStripePaymentButtons,
  PaymentButton,
  setLoadingStripePayment,
  stripePubKey,
}: Props) {
  return stripePubKey ? (
    <Elements stripe={loadStripe(stripePubKey)}>
      <InnerForm
        doStripePayment={doStripePayment}
        doStripePaymentRequestForButton={doStripePaymentRequestForButton}
        cart={cart}
        error={error}
        loadingStripePayment={loadingStripePayment}
        loadingStripePaymentButtons={loadingStripePaymentButtons}
        setLoadingStripePayment={setLoadingStripePayment}
        PaymentButton={PaymentButton}
      />
    </Elements>
  ) : (
    <div style={{ alignItems: 'center' }}>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '1rem',
          textAlign: 'center',
        }}
      >
        <div className='spinner-merchi-small' />
      </div>
    </div>
  );
}

export default FormStripeCardFields;
