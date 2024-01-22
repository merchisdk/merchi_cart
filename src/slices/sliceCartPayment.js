import { createSlice } from '@reduxjs/toolkit';
function setLoadingKeys(state, action, newState) {
    var _a = action.payload, _b = _a.loadingKey, loadingKey = _b === void 0 ? null : _b, _c = _a.loadingKeys, loadingKeys = _c === void 0 ? null : _c;
    if (Array.isArray(loadingKeys)) {
        loadingKeys.map(function (lK) { return state[lK] = newState; });
    }
    if (typeof loadingKey === 'string') {
        state[loadingKey] = newState;
    }
}
export var sliceCartPayment = createSlice({
    initialState: {
        cartCompleteLoading: false,
        invoice: {},
        loading: false,
    },
    name: 'stateCartPayment',
    reducers: {
        doCardComplete: function (state) {
            state.cartCompleteLoading = true;
        },
        fetchInvoice: function (state, action) {
            setLoadingKeys(state, action, true);
        },
        fetchInvoiceError: function (state, action) {
            setLoadingKeys(state, action, false);
        },
        fetchInvoiceSuccess: function (state, action) {
            var invoice = action.payload.invoice;
            state.invoice = invoice;
            setLoadingKeys(state, action, false);
        },
        setInvoice: function (state, action) {
            state.invoice = action.payload;
        },
        creditCardPaySuccess: function (state, action) {
            state.invoice = action.payload;
        },
    },
});
