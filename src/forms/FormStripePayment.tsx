import * as React from 'react';
import { useSelector } from 'react-redux';
import ButtonPay from '../buttons/ButtonPay';
import { callbackCreditCardPaymentSuccess } from '../store';
import CreditCardImages from '../../components/payments/CreditCardImages';
import FormStripeCard from '../../stripe/forms/FormStripeCard';

function FormStripePayment() {
  const { cart } = useSelector((s: any) => s.stateCart);
  const company = cart && cart.domain && cart.domain.company;
  function PaymentButton({ loading }: any) {
    return (
      <div>
        <ButtonPay
          cart={cart}
          loading={loading} />
      </div>
    );
  }
  return (
    <>
      {Boolean(company) &&
        <FormStripeCard
          callbackStripePaymentSuccess={callbackCreditCardPaymentSuccess}
          invoice={cart}
          isCart={true}
          hideLabels={true}
          PaymentButton={PaymentButton}
        />
      }
      <div style={{marginTop: '2rem'}}>
        <CreditCardImages
          height='45'
          showStripe={true}
        />
      </div>
    </>
  );
}

export default FormStripePayment;
