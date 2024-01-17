import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const sliceStripeForm = createSlice({
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
    actionFetchAcceptedPaymentMethods: (state: any) => {
      state.loadingAcceptedPaymentMethods = true;
    },
    actionFetchAcceptedPaymentMethodsDone: (state: any, action: PayloadAction<any>) => {
      state.loadingAcceptedPaymentMethods = false;
      state.acceptedPaymentMethods = action.payload;
    },
    actionStripePaymentEnd: (state: any) => {
      state.loading = false;
    },
    actionStripePaymentStart: (state: any) => {
      state.loading = true;
    },
    actionStripePaymentRequestButtonEnd: (state: any) => {
      state.loadingPaymentRequestButton = false;
    },
    actionStripePaymentRequestButtonStart: (state: any) => {
      state.loadingPaymentRequestButton = true;
    },
    actionStripeWeChatPaymentEnd: (state: any) => {
      state.loadingWeChatPayment = false;
    },
    actionStripeWeChatPaymentStart: (state: any) => {
      state.loadingWeChatPayment = true;
    },
    setInvoiceOrCart: (state: any, action: PayloadAction<any>) => {
      const { invoice, isCart } = action.payload;
      state.invoice = invoice;
      if (isCart) {
        state.isCart = isCart;
      }
    },
    stripePaymentEnd: (state: any) => {
      state.loading = false;
    },
    stripePaymentStart: (state: any, action: PayloadAction<any>) => {
      state.loading = true;
    },
  },
});

export default sliceStripeForm;
