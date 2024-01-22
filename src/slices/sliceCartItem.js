import { createSlice } from '@reduxjs/toolkit';
var sliceCartItem = createSlice({
    initialState: {
        cartItem: {},
        fetchingPrice: false,
        index: 0,
        savingCartItem: false,
    },
    name: 'stateCartItem',
    reducers: {
        patchCartItem: function (state) {
            state.savingCartItem = true;
        },
        patchCartItemError: function (state) {
            state.savingCartItem = false;
        },
        patchCartItemSuccess: function (state) {
            state.savingCartItem = false;
        },
        setCartItem: function (state, action) {
            var _a = action.payload, cartItem = _a.cartItem, index = _a.index;
            state.cartItem = cartItem;
            state.index = index;
        }
    },
});
export default sliceCartItem;
