import { createSlice, PayloadAction } from '@reduxjs/toolkit';

function setLoadingKeys(state: any, action: any, newState: boolean) {
  const {
    loadingKey = null,
    loadingKeys = null,
  } = action.payload;
  if (Array.isArray(loadingKeys)) {
    loadingKeys.map((lK: string) => state[lK] = newState);
  }
  if (typeof loadingKey === 'string') {
    state[loadingKey] = newState;
  }
}

export const sliceCartPayment = createSlice({
  initialState: {
    cartCompleteLoading: false,
    invoice: {},
    loading: false,
  },
  name: 'cartPaymentState',
  reducers: {
    doCardComplete: (state: any) => {
      state.cartCompleteLoading = true;
    },
    fetchInvoice: (state: any, action: any) => {
      setLoadingKeys(state, action, true);
    },
    fetchInvoiceError: (state: any, action: any) => {
      setLoadingKeys(state, action, false);
    },
    fetchInvoiceSuccess: (state: any, action: any) => {
      const { invoice } = action.payload;
      state.invoice = invoice;
      setLoadingKeys(state, action, false);
    },
    setInvoice: (state: any, action: any) => {
      state.invoice = action.payload;
    },
    creditCardPaySuccess: (state: any, action: PayloadAction<any>) => {
      state.invoice = action.payload;
    },
  },
});
