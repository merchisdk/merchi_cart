import { createSlice } from '@reduxjs/toolkit';
var sliceFormReturningCustomer = createSlice({
    initialState: {
        returningCustomerError: false,
        returningCustomerLoading: false
    },
    name: 'stateFormReturningCustomer',
    reducers: {
        setReturningCustomerError: function (state, action) {
            state.returningCustomerError = action.payload;
        },
        tryReturningCustomer: function (state) {
            state.returningCustomerLoading = true;
        },
        tryReturningCustomerError: function (state) {
            state.returningCustomerLoading = false;
        },
        tryReturningCustomerSuccess: function (state) {
            state.returningCustomerLoading = false;
        },
    },
});
export default sliceFormReturningCustomer;
