import * as React from 'react';
import { toggleCartOpen } from './store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useCartContext } from './CartProvider';

function CartHeader() {
  const {
    classNameCartHeader,
    classNameBtnClose,
  } = useCartContext();
  return (
    <div className={classNameCartHeader}>
      <FontAwesomeIcon icon={faShoppingCart} /> Shopping cart
      <button
        type="button"
        className={classNameBtnClose}
        aria-label="Close"
        onClick={toggleCartOpen}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
}

export default CartHeader;
