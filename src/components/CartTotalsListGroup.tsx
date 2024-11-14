import React from 'react';
import { useCartContext } from '../CartProvider';
import { cartRequiresShipment } from '../utilities/cart';
import { CartTotal } from '../CartTotals';

interface RowProps {
  attr: string;
  name: string;
}

function CostsListItem({ attr, name }: RowProps) {
  const {
    classNameCartTotalItem,
    classNameCartTotalItemPrice,
    classNameListItemCartTotals,
  } = useCartContext();

  return (
    <li className={classNameListItemCartTotals}>
      <span className={classNameCartTotalItem}>{name}</span>
      <span className={classNameCartTotalItemPrice}>
        <CartTotal attribute={attr} />
      </span>
    </li>
  );
}

function CartTotalsListGroup() {
  const {
    cart,
    classNameCartTotaListContainer,
    classNameCartTotalItemPrice,
    classNameList,
    classNameListItem
  } = useCartContext();
  const cartItems = cart.cartItems ? cart.cartItems : [];

  return (
    <div className={classNameCartTotaListContainer}>
      <ul className={classNameList}>
        {!!Number(cart.discountedAmount) && (
          <CostsListItem attr="discountedAmount" name="Discount" />
        )}
        <CostsListItem attr="cartItemsSubtotalCost" name="Subtotal" />
        {cartRequiresShipment({ ...cart, cartItems }) && (
          <CostsListItem attr="shipmentTotalCost" name="Shipping" />
        )}
        {!!cart.taxAmount && (<CostsListItem attr="taxAmount" name="Tax" />)}
        <CostsListItem attr="totalCost" name="Total" />
        <li className={classNameListItem}>
          <div className={classNameCartTotalItemPrice}>Total price includes taxes</div>
        </li>
      </ul>
    </div>
  );
}

export default CartTotalsListGroup;
