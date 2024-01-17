import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const sliceNewCustomerForm = createSlice({
  initialState: {
    creatingNewCustomer: false,
    serverError: '',
  },
  name: 'stateNewCustomerForm',
  reducers: {
    createNewCustomer: (state: any) => {
      state.creatingNewCustomer = true;
      state.serverError = '';
    },
    createNewCustomerError: (state: any, action: PayloadAction<string>) => {
      state.creatingNewCustomer = false;
      state.serverError = action.payload;
    },
    createNewCustomerSuccess: (state: any) => {
      state.creatingNewCustomer = false;
    },
  },
});

export default sliceNewCustomerForm;
