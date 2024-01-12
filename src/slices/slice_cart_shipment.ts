import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const shipmentFormId = '_shipment-address-form-id';

export const sliceCartShipment = createSlice({
  initialState: {
    addressFieldsOpen: false,
    fetchingShipmentGroups: false,
    fetchingShipmentQuote: false,
    googleMapsInitialised: false,
    receiverAddress: {},
    receiverNotes: '',
    savingShipmentAddress: false,
    shipmentGroups: [],
    selectedQuotes: [],
  },
  name: 'cartShipmentState',
  reducers: {
    initCartShipmentSlice: (state: any, action: PayloadAction<any>) => {
      const cart = action.payload;
      const groups = cart.shipmentGroups;
      state.receiverAddress = cart.receiverAddress;
      state.receiverNotes = cart.receiverNotes;
      state.shipmentGroups = groups;
      state.selectedQuotes = groups.map((g: any) => g.selectedQuote);
    },
    saveShipmentAddress: (state: any) => {
      state.savingShipmentAddress = true;
    },
    saveShipmentAddressError: (state: any) => {
      state.savingShipmentAddress = false;
    },
    saveShipmentAddressSuccess: (state: any) => {
      state.savingShipmentAddress = false;
    },
    setGoogleMapsInitialised: (state: any, action: PayloadAction<boolean>) => {
      state.googleMapsInitialised = action.payload;
    },
    setSelectedShipmentQuote: (state: any, action: PayloadAction<any>) => {
      const { groupIndex, quote } = action.payload;
      state.selectedQuotes[groupIndex] = quote;
      state.fetchingShipmentQuote = true;
    },
    setSelectedShipmentQuoteError: (state: any) => {
      state.fetchingShipmentQuote = false;
    },
    setSelectedShipmentQuoteSuccess: (state: any) => {
      state.fetchingShipmentQuote = false;
    },
    toggleAddressFields: (state: any) => {
      state.addressFieldsOpen = !state.addressFieldsOpen;
    },
    updateShipmentAddress: (state: any, action: PayloadAction<any>) => {
      state.receiverAddress = action.payload;
      state.fetchingShipmentGroups = true;
    },
    updateShipmentAddressError: (state: any) => {
      state.fetchingShipmentGroups = false;
    },
    updateShipmentAddressSuccess: (state: any, action: PayloadAction<any>) => {
      const groups = action.payload;
      state.fetchingShipmentGroups = false;
      state.shipmentGroups = groups;
      state.selectedQuotes = groups.map((g: any) => g.selectedQuote);
    },
  },
});
