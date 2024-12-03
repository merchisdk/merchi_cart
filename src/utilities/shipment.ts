export const shipmentFormId = '_shipment-address-form-id';

export function cartItemsNeedShipment(cart: any) {
  const { cartItems = [] } = cart;
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].product && cartItems[i].product.needsShipping) {
      return true;
    }
  }
  return false;
}
