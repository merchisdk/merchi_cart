import { createSlice } from '@reduxjs/toolkit';
var sliceStripeForm = createSlice({
    initialState: {
        acceptedPaymentMethods: {},
        invoice: {},
        isCart: false,
        loading: false,
        loadingAcceptedPaymentMethods: false,
        loadingPaymentRequestButton: false,
        loadingWeChatPayment: false,
    },
    name: 'stateStripeForm',
    reducers: {
        actionFetchAcceptedPaymentMethods: function (state) {
            state.loadingAcceptedPaymentMethods = true;
        },
        actionFetchAcceptedPaymentMethodsDone: function (state, action) {
            state.loadingAcceptedPaymentMethods = false;
            state.acceptedPaymentMethods = action.payload;
        },
        actionStripePaymentEnd: function (state) {
            state.loading = false;
        },
        actionStripePaymentStart: function (state) {
            state.loading = true;
        },
        actionStripePaymentRequestButtonEnd: function (state) {
            state.loadingPaymentRequestButton = false;
        },
        actionStripePaymentRequestButtonStart: function (state) {
            state.loadingPaymentRequestButton = true;
        },
        actionStripeWeChatPaymentEnd: function (state) {
            state.loadingWeChatPayment = false;
        },
        actionStripeWeChatPaymentStart: function (state) {
            state.loadingWeChatPayment = true;
        },
        setInvoiceOrCart: function (state, action) {
            var _a = action.payload, invoice = _a.invoice, isCart = _a.isCart;
            state.invoice = invoice;
            if (isCart) {
                state.isCart = isCart;
            }
        },
        stripePaymentEnd: function (state) {
            state.loading = false;
        },
        stripePaymentStart: function (state, action) {
            state.loading = true;
        },
    },
});
export default sliceStripeForm;
