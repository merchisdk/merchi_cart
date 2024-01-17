import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const sliceFormReturningCustomer = createSlice({
  initialState: {
    returningCustomerError: false,
    returningCustomerLoading: false
  },
  name: 'stateFormReturningCustomer',
  reducers: {
    setReturningCustomerError: (state: any, action: PayloadAction<boolean>) => {
      state.returningCustomerError = action.payload;
    },
    tryReturningCustomer: (state: any) => {
      state.returningCustomerLoading = true;
    },
    tryReturningCustomerError: (state: any) => {
      state.returningCustomerLoading = false;
    },
    tryReturningCustomerSuccess: (state: any) => {
      state.returningCustomerLoading = false;
    },
  },
});

export default sliceFormReturningCustomer;
