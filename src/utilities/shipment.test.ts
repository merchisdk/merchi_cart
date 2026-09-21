import {
  checkoutShipmentHydrationAction,
  shipmentGroupsHaveQuotes,
} from './shipment';

const savedAddress = {
  lineOne: '32 Bridge St',
  city: 'Brighton',
  state: 'VIC',
  postcode: '3186',
  country: 'AU',
};

describe('shipmentGroupsHaveQuotes', () => {
  it('is false when groups are missing or empty', () => {
    expect(shipmentGroupsHaveQuotes(undefined)).toBe(false);
    expect(shipmentGroupsHaveQuotes([])).toBe(false);
    expect(shipmentGroupsHaveQuotes([{ quotes: [] }])).toBe(false);
  });

  it('is true when any group has quotes', () => {
    expect(
      shipmentGroupsHaveQuotes([{ quotes: [] }, { quotes: [{ id: 1 }] }])
    ).toBe(true);
  });
});

describe('checkoutShipmentHydrationAction', () => {
  it('applies a localStorage address when the cart has none', () => {
    expect(
      checkoutShipmentHydrationAction({
        cartAddress: {},
        savedAddress,
        shipmentGroups: [],
      })
    ).toBe('apply-saved-address');
  });

  it('refreshes quotes when the cart already has an address but no options', () => {
    expect(
      checkoutShipmentHydrationAction({
        cartAddress: savedAddress,
        savedAddress,
        shipmentGroups: [],
      })
    ).toBe('refresh-quotes');
  });

  it('does nothing when quotes are already available', () => {
    expect(
      checkoutShipmentHydrationAction({
        cartAddress: savedAddress,
        savedAddress,
        shipmentGroups: [{ quotes: [{ id: 9 }] }],
      })
    ).toBe(null);
  });

  it('does nothing when neither cart nor localStorage has an address', () => {
    expect(
      checkoutShipmentHydrationAction({
        cartAddress: {},
        savedAddress: {},
        shipmentGroups: [],
      })
    ).toBe(null);
  });
});
