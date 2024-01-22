import { createSlice } from '@reduxjs/toolkit';
export var shipmentFormId = '_shipment-address-form-id';
export var sliceCartShipment = createSlice({
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
    name: 'stateCartShipment',
    reducers: {
        initCartShipmentSlice: function (state, action) {
            var cart = action.payload;
            var groups = cart.shipmentGroups;
            state.receiverAddress = cart.receiverAddress;
            state.receiverNotes = cart.receiverNotes;
            state.shipmentGroups = groups;
            state.selectedQuotes = groups.map(function (g) { return g.selectedQuote; });
        },
        saveShipmentAddress: function (state) {
            state.savingShipmentAddress = true;
        },
        saveShipmentAddressError: function (state) {
            state.savingShipmentAddress = false;
        },
        saveShipmentAddressSuccess: function (state) {
            state.savingShipmentAddress = false;
        },
        setGoogleMapsInitialised: function (state, action) {
            state.googleMapsInitialised = action.payload;
        },
        setSelectedShipmentQuote: function (state, action) {
            var _a = action.payload, groupIndex = _a.groupIndex, quote = _a.quote;
            state.selectedQuotes[groupIndex] = quote;
            state.fetchingShipmentQuote = true;
        },
        setSelectedShipmentQuoteError: function (state) {
            state.fetchingShipmentQuote = false;
        },
        setSelectedShipmentQuoteSuccess: function (state) {
            state.fetchingShipmentQuote = false;
        },
        toggleAddressFields: function (state) {
            state.addressFieldsOpen = !state.addressFieldsOpen;
        },
        updateShipmentAddress: function (state, action) {
            state.receiverAddress = action.payload;
            state.fetchingShipmentGroups = true;
        },
        updateShipmentAddressError: function (state) {
            state.fetchingShipmentGroups = false;
        },
        updateShipmentAddressSuccess: function (state, action) {
            var groups = action.payload;
            state.fetchingShipmentGroups = false;
            state.shipmentGroups = groups;
            state.selectedQuotes = groups.map(function (g) { return g.selectedQuote; });
        },
    },
});
