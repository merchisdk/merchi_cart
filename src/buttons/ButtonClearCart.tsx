import * as React from 'react';
import { tabIdClearCart } from '../slices/sliceCart';
import { setActiveTab } from '../store';
import { Button } from 'reactstrap';

interface Props {}

function ButtonClearCart(props: Props) {
  return (
    <Button
      className='mr-auto'
      color='danger'
      onClick={() => setActiveTab(tabIdClearCart)}
      size='lg'
    >
      Clear cart
    </Button>
  );
}

export default ButtonClearCart;
