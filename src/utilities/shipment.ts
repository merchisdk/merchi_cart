import { addressHasContent, SavedCheckoutAddress } from './local_storage';

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

export function shipmentGroupsHaveQuotes(groups?: any[] | null) {
  if (!groups?.length) return false;
  return groups.some(
    (group) => Array.isArray(group?.quotes) && group.quotes.length > 0
  );
}

export type CheckoutShipmentHydrationAction =
  | 'apply-saved-address'
  | 'refresh-quotes'
  | null;

/**
 * When checkout hydrates a saved address (localStorage) the form shows it,
 * but quotes are only fetched after the user edits the field. Returning
 * `apply-saved-address` means the cart still needs that address applied so
 * quotes can be generated; `refresh-quotes` means the cart already has an
 * address but no usable shipment options.
 */
export function checkoutShipmentHydrationAction(options: {
  cartAddress?: SavedCheckoutAddress | null;
  savedAddress?: SavedCheckoutAddress | null;
  shipmentGroups?: any[] | null;
}): CheckoutShipmentHydrationAction {
  const hasCartAddress = addressHasContent(options.cartAddress);
  const hasSavedAddress = addressHasContent(options.savedAddress);
  const hasQuotes = shipmentGroupsHaveQuotes(options.shipmentGroups);
  if (!hasCartAddress && hasSavedAddress) return 'apply-saved-address';
  if (hasCartAddress && !hasQuotes) return 'refresh-quotes';
  return null;
}
