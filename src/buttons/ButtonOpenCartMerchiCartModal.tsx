import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import { useCartContext } from '../CartProvider';

const Badge = ({ color, children }: any) => {
  return <span className={`merchi-cart-badge badge-${color}`}>{children}</span>;
}

export function ButtonOpenCart() {
  const {
    cart,
    classNameCartToggleIconButton,
    fetchingCart,
    loading,
    toggleCartModal,
  } = useCartContext();
  const cartItems = cart.cartItems || [];
  return (
    <Button
      onClick={toggleCartModal}
      className={classNameCartToggleIconButton}
    >
      <FontAwesomeIcon
        icon={loading || fetchingCart ? faCircleNotch : faShoppingCart}
        spin={loading || fetchingCart}
      />
      {cartItems.length > 0 ? (
        <Badge color='danger'>
          {cartItems.length}
        </Badge>
      ) : null}
    </Button>
  );
}

interface Props {
  cartButtonWrappedInContainer?: boolean;
  listContainerClass?: string;
  listItemClass?: string;
}

export function ButtonListWrappedOpenCart(props: Props) {
  const {
    cartButtonWrappedInContainer = true,
    listContainerClass,
    listItemClass,
  } = props;
  return (
    cartButtonWrappedInContainer ? (
      <ul className={listContainerClass}>
        <li className={listItemClass}>
          <ButtonOpenCart />
        </li>
      </ul>
    ) : (
      <ButtonOpenCart />
    )
  );
}
