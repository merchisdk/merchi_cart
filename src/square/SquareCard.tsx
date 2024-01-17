import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';
import { actionSquarePaymentProcess } from './actions';
import { currencyMap } from '../utilities/currency';
import { callbackCreditCardPaymentSuccess } from '../store';

declare const SQUARE_APPLICATION_ID: string;

function SquareCard() {
  const { cart } = useSelector((s: any) => s.stateCart);
  const { currency, domain, totalCost } = cart;
  const company = domain.company;
  const dispatch = useDispatch();
  function ButtonText() {
    return (
      <span>
        Pay {currencyMap[currency]}
        {totalCost}<small> / inc tax</small>
      </span>
    );
  }
  const squareWebLocationId = company.squareWebLocationId;
  return squareWebLocationId ?
    (
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
            dispatch,
            cart,
            token.token,
            callbackCreditCardPaymentSuccess)
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
    )
  :
    <></>;
}

export default SquareCard;
