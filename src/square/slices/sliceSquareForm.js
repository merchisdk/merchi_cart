import { createSlice } from '@reduxjs/toolkit';
var sliceSquareForm = createSlice({
    initialState: {
        invoice: {},
        isCart: false,
        loading: false,
        loadingAcceptedPaymentMethods: false,
        loadingPaymentRequestButton: false,
    },
    name: 'stateSquareForm',
    reducers: {
        actionSquarePaymentEnd: function (state) {
            state.loading = false;
        },
        actionSquarePaymentStart: function (state) {
            state.loading = true;
        },
        setInvoiceOrCart: function (state, action) {
            var _a = action.payload, invoice = _a.invoice, isCart = _a.isCart;
            state.invoice = invoice;
            if (isCart) {
                state.isCart = isCart;
            }
        },
    },
});
export default sliceSquareForm;
