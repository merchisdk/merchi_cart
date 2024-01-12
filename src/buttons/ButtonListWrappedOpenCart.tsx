import * as React from 'react';
import ButtonOpenCart from './button_open_cart';

interface Props {
  cartButtonWrappedInContainer?: boolean;
  cartIconButtonClass?: string;
  classNameListContainer?: string;
  classNameListItem?: string;
}

function ButtonListWrappedOpenCart(props: Props) {
  const {
    cartButtonWrappedInContainer = true,
    cartIconButtonClass = 'cart-icon-button-class',
    classNameListContainer,
    classNameListItem,
  } = props;
  return cartButtonWrappedInContainer ? (
    <ul className={classNameListContainer}>
      <li className={classNameListItem}>
        <ButtonOpenCart
          cartIconButtonClass={cartIconButtonClass}
        />
      </li>
    </ul>
  ) : (
    <ButtonOpenCart
      cartIconButtonClass={cartIconButtonClass}
    />
  );
}

export default ButtonListWrappedOpenCart;
