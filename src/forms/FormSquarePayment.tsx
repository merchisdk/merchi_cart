import * as React from 'react';
import { useSelector } from 'react-redux';
import { callbackCreditCardPaymentSuccess } from '../store';
import CreditCardImages from '../../components/payments/CreditCardImages';
import SquareCard from '../../square/SquareCard';

function FormSquarePayment() {
  const { cart } = useSelector((s: any) => s.stateCart);
  const company = cart && cart.domain && cart.domain.company;
  return (
    <>
      {Boolean(company) && company.acceptSquare &&
        <>
          <SquareCard
            invoice={cart}
            isCart={true}
            callbackPaymentSuccess={callbackCreditCardPaymentSuccess}
          />
          <div style={{marginTop: '2rem'}}>
            <CreditCardImages
              height='45'
              showSquare={true}
            />
          </div>
        </>
      }
    </>
  );
}

export default FormSquarePayment;
