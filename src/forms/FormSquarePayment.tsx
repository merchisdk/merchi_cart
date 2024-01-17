import * as React from 'react';
import { useSelector } from 'react-redux';
import SquareCard from '../square/SquareCard';

function FormSquarePayment() {
  const { cart } = useSelector((s: any) => s.stateCart);
  const company = cart && cart.domain && cart.domain.company;
  return (
    <>
      {Boolean(company) && company.acceptSquare && <SquareCard />}
    </>
  );
}

export default FormSquarePayment;
