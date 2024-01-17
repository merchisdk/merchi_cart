import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import {
  CanMakePaymentResult,
  PaymentRequest,
  PaymentRequestOptions,
  PaymentRequestPaymentMethodEvent,
  StripePaymentRequestButtonElementOptions 
} from '@stripe/stripe-js';
import {
  PaymentRequestButtonElement,
  useStripe,
} from '@stripe/react-stripe-js';


function useOptions(paymentRequest: PaymentRequest) {
  const options = useMemo(
    () => ({
      paymentRequest,
      style: {
        paymentRequestButton: {
          theme: 'dark',
          height: '48px',
          type: 'buy'
        }
      }
    }),
    [paymentRequest]
  );

  return options;
}

interface UsePaymentRequest {
  onPaymentMethod: (payload: any) => void;
  options: PaymentRequestOptions;
}

function usePaymentRequest({ options, onPaymentMethod }: UsePaymentRequest) {
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState((null as unknown));
  const [canMakePayment, setCanMakePayment] = useState(false);

  useEffect(() => {
    if (stripe && paymentRequest === null) {
      const pr = stripe.paymentRequest(options);
      setPaymentRequest((pr as any));
    }
  }, [stripe, options, paymentRequest]);

  useEffect(() => {
    let subscribed = true;
    if (paymentRequest) {
      (paymentRequest as PaymentRequest).canMakePayment().then(
        (res: CanMakePaymentResult | null) => {
          if (res && subscribed) {
            setCanMakePayment(true);
          }
        });
    }

    return () => {
      subscribed = false;
    };
  }, [paymentRequest]);

  useEffect(() => {
    if (paymentRequest) {
      (paymentRequest as any).on('paymentmethod', onPaymentMethod);
    }
    return () => {
      if (paymentRequest) {
        (paymentRequest as any).off('paymentmethod', onPaymentMethod);
      }
    };
  }, [paymentRequest, onPaymentMethod]);

  return canMakePayment ? paymentRequest : null;
}

interface PropsStripePaymentButtons {
  doPaymentRequest: (event: PaymentRequestPaymentMethodEvent) => void;
  cart: any;
}

function StripePaymentButtons(
  {
    doPaymentRequest,
    cart,
  }: PropsStripePaymentButtons) {
  const paymentRequest: unknown = usePaymentRequest({
    options: {
      country: cart.domain.company.country,
      currency: String(cart.currency).toLowerCase(),
      total: {
        label: `Merchi Cart #${cart.id}`,
        amount: Math.round(cart.totalCost * 100)
      }
    },
    onPaymentMethod: doPaymentRequest
  });
  const options = useOptions((paymentRequest as PaymentRequest));

  if (!paymentRequest) {
    return null;
  }
  return (
    <div style={{marginBottom: '2rem', marginTop: '2rem'}}>
      <PaymentRequestButtonElement
        className='PaymentRequestButton'
        options={(options as StripePaymentRequestButtonElementOptions)}
      />
    </div>
  );
}

export default StripePaymentButtons;
