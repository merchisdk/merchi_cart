import * as React from 'react';
import { useCartContext } from '../CartProvider';
import { currencyMap } from '../utilities/currency';
import Button from './Button';

interface Props {
  cart: any;
  loading: boolean;
}

function ButtonPay({ cart, loading }: Props) {
  const { classNameBtnPay } = useCartContext();
  const { currency, totalCost } = cart;
  return (
    <Button
      className={classNameBtnPay}
      disabled={loading}
      type='submit'
    >
      {loading ? (
        <span>Loading...</span>
      ) : (
        <span>
          Pay {currencyMap[currency]}
          {totalCost}<small> / inc tax</small>
        </span>
      )}
    </Button>
  );
}

export default ButtonPay;
