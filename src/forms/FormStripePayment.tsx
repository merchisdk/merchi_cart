import * as React from 'react';
import { useSelector } from 'react-redux';
import StripeCardForm from '../stripe/StripeCardForm';

function FormStripePayment() {
  const { cart } = useSelector((s: any) => s.stateCart);
  const company = cart && cart.domain && cart.domain.company;
  return (
    <>
      {Boolean(company) && <StripeCardForm />}
    </>
  );
}

export default FormStripePayment;
