import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useCartContext } from './CartProvider';
import { toggleCartOpen } from './store';

function CartHeader() {
  const {
    classNameCartHeader,
    classNameBtnClose,
    onClickClose,
  } = useCartContext();
  return (
    <div className={classNameCartHeader}>
      <h5><FontAwesomeIcon icon={faShoppingCart} />{' '}Shopping cart</h5>
      <button
        type="button"
        className={classNameBtnClose}
        aria-label="Close"
        onClick={onClickClose || toggleCartOpen}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
}

export default CartHeader;
