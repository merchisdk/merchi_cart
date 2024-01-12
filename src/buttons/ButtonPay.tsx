import * as React from 'react';
import { currencyMap } from '../../currency';
import { Button } from 'reactstrap';

interface Props {
  cart: any;
  loading: boolean;
}

function ButtonPay({ cart, loading }: Props) {
  const { currency, totalCost } = cart;
  return (
    <Button
      disabled={loading}
      color='primary'
      size='lg'
      type='submit'
      block>
      {loading ?
        <span>Loading...</span> :
        <span>Pay {currencyMap[currency]}
      {totalCost}<small> / inc tax</small></span>}
    </Button>
  );
}

export default ButtonPay;
