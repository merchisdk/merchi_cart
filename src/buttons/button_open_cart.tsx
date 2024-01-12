import * as React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { toggleCartOpen } from '../store';
import { Badge, Button } from 'reactstrap';

interface Props {
  cartIconButtonClass?: string;
}

function ButtonOpenCart(props: Props) {
  const { cartIconButtonClass = 'cart-icon-button-class' } = props;
  const { cart, fetchingCart, loading } = useSelector((s: any) => s.stateCart);
  const cartItems = cart.cartItems ? cart.cartItems : [];
  return (
    <Button
      onClick={toggleCartOpen}
      className={cartIconButtonClass}
    >
      <FontAwesomeIcon
        icon={loading || fetchingCart ? faCircleNotch : faShoppingCart}
        spin={loading || fetchingCart}
      />
      {cartItems.length > 0 ?
        <Badge className='m-l-5' color='danger'>
          {cartItems.length}
        </Badge> : null}
    </Button>
  );
}

export default ButtonOpenCart;
