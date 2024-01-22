import { createSlice } from '@reduxjs/toolkit';
var sliceNewCustomerForm = createSlice({
    initialState: {
        creatingNewCustomer: false,
        serverError: '',
    },
    name: 'stateNewCustomerForm',
    reducers: {
        createNewCustomer: function (state) {
            state.creatingNewCustomer = true;
            state.serverError = '';
        },
        createNewCustomerError: function (state, action) {
            state.creatingNewCustomer = false;
            state.serverError = action.payload;
        },
        createNewCustomerSuccess: function (state) {
            state.creatingNewCustomer = false;
        },
    },
});
export default sliceNewCustomerForm;
