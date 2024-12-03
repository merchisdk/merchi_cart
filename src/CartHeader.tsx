import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useCartContext } from './CartProvider';

function CartHeader() {
  const {
    classNameCartHeader,
    classNameBtnClose,
    onClickClose,
    toggleCartModal,
  } = useCartContext();
  return (
    <div className={classNameCartHeader}>
      <h5><FontAwesomeIcon icon={faShoppingCart} />{' '}Shopping cart</h5>
      <button
        type="button"
        className={classNameBtnClose}
        aria-label="Close"
        onClick={onClickClose || toggleCartModal}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
}

export default CartHeader;
