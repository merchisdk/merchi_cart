import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const sliceSquareForm = createSlice({
  initialState: {
    invoice: {},
    isCart: false,
    loading: false,
    loadingAcceptedPaymentMethods: false,
    loadingPaymentRequestButton: false,
  },
  name: 'stateSquareForm',
  reducers: {
    actionSquarePaymentEnd: (state: any) => {
      state.loading = false;
    },
    actionSquarePaymentStart: (state: any) => {
      state.loading = true;
    },
    setInvoiceOrCart: (state: any, action: PayloadAction<any>) => {
      const { invoice, isCart } = action.payload;
      state.invoice = invoice;
      if (isCart) {
        state.isCart = isCart;
      }
    },
  },
});

export default sliceSquareForm;
