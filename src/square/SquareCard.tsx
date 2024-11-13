import * as React from 'react';
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';
import { currencyMap } from '../utilities/currency';
import { useCartContext } from '../CartProvider';
import { tabIdPaymentSuccess } from '../utilities/tabs';
import { Merchi } from 'merchi_sdk_ts';

declare const SQUARE_APPLICATION_ID: string;

function SquareCard() {
  const {
    alertError,
    cart,
    setActiveTabIndex,
    setInvoiceJson,
  } = useCartContext();
  const { currency, domain, totalCost } = cart;
  const [loading, setLoading] = React.useState(false);
  const company = domain.company;
  function ButtonText() {
    return (
      <span>
        Pay {currencyMap[currency]}
        {totalCost}<small> / inc tax</small>
      </span>
    );
  }
  const squareWebLocationId = company.squareWebLocationId;
  function callbackCreditCardPaymentSuccess(invoiceJson: any) {
    setInvoiceJson(invoiceJson);
    setActiveTabIndex(tabIdPaymentSuccess);
  }

  async function actionSquarePaymentProcess(
    sourceId: string,
    callbackPaymentSuccess: any,
  ) {
    setLoading(true);
    let url = `/cart/${cart.id}/square/payment/`;
    const fetchOptions: any = {
      method: 'GET',
      query: [['sourceId', sourceId], ['cart_token', cart.token]],
    };
    try {
      const merchi = new Merchi();
      const r = await merchi.authenticatedFetch(url, fetchOptions);
      callbackPaymentSuccess(r.invoice);
    } catch(e: any) {
      alertError(e.errorMessage || e.message || 'Server eror.');
    } finally {
      setLoading(false);
    }
  }
  return squareWebLocationId ? (
    <PaymentForm
      /**
       * Identifies the calling form with a verified application ID generated from
       * the Square Application Dashboard.
       */
      applicationId={SQUARE_APPLICATION_ID}
      /**
       * Invoked when payment form receives the result of a tokenize generation
       * request. The result will be a valid credit card or wallet token, or an error.
       */
      cardTokenizeResponseReceived={(token: any, buyer: any) =>
        actionSquarePaymentProcess(
          token.token,
          callbackCreditCardPaymentSuccess
        )
      }
      /**
       * Identifies the location of the merchant that is taking the payment.
       * Obtained from the Square Application Dashboard - Locations tab.
       */
      locationId={squareWebLocationId}
    >
      <CreditCard>
        <ButtonText />
      </CreditCard>
    </PaymentForm>
  ) : <></>;
}

export default SquareCard;
