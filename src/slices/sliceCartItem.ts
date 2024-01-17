import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const sliceCartItem = createSlice({
  initialState: {
    cartItem: {},
    fetchingPrice: false,
    index: 0,
    savingCartItem: false,
  },
  name: 'stateCartItem',
  reducers: {
    patchCartItem: (state: any) => {
      state.savingCartItem = true;
    },
    patchCartItemError: (state: any) => {
      state.savingCartItem = false;
    },
    patchCartItemSuccess: (state: any) => {
      state.savingCartItem = false;
    },
    setCartItem: (state: any, action: PayloadAction<any>) => {
      const { cartItem, index } = action.payload;
      state.cartItem = cartItem;
      state.index = index;
    }
  },
});

export default sliceCartItem;
