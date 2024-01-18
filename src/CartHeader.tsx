import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useCartContext } from './CartProvider';

function CartHeader() {
  const {
    classNameCartHeader,
    classNameBtnClose,
    onClickClose,
  } = useCartContext();
  return (
    <div className={classNameCartHeader}>
      <FontAwesomeIcon icon={faShoppingCart} /> Shopping cart
      <button
        type="button"
        className={classNameBtnClose}
        aria-label="Close"
        onClick={onClickClose}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
}

export default CartHeader;
