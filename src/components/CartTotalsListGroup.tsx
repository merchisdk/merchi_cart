import React from 'react';
import { useCartContext } from '../CartProvider';
import { cartRequiresShipment } from '../utilities/cart';
import { useSelector } from 'react-redux';
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
    classNameCartTotaListContainer,
    classNameCartTotalItemPrice,
    classNameList,
    classNameListItem
  } = useCartContext();
  const { cart } = useSelector((s: any) => s.stateCart);
  const cartItems = cart.cartItems ? cart.cartItems : [];

  return (
    <div className={classNameCartTotaListContainer}>
      <ul className={classNameList}>
        <CostsListItem attr="cartItemsTotalCost" name="Subtotal" />
        {cartRequiresShipment({ ...cart, cartItems }) && (
          <CostsListItem attr="shipmentTotalCost" name="Shipping" />
        )}
        <CostsListItem attr="totalCost" name="Total" />
        <li className={classNameListItem}>
          <div className={classNameCartTotalItemPrice}>Total price includes taxes</div>
        </li>
      </ul>
    </div>
  );
}

export default CartTotalsListGroup;
