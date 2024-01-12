import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { makeCartItem } from '../../ts_helpers/cart';
import {
  createGroup,
  createVariation,
} from '../../ts_helpers/variations';

export function createQuoteCartItem(stateQuoteCartItem: any, quoteCartItem: any, cartItemEntity: any) {
  const quoteCartItemEntity = makeCartItem(
    {...stateQuoteCartItem, product: {id: cartItemEntity.product.id}}
  );
  const { quantity = 0, variations, variationsGroups } = quoteCartItem;
  quoteCartItemEntity.taxType = cartItemEntity.taxType;
  quoteCartItemEntity.quantity = quantity;
  const v = variations ? variations : stateQuoteCartItem.variations;
  const vG = variationsGroups ? variationsGroups : stateQuoteCartItem.variationsGroups;
  if (cartItemEntity.variations) {
    quoteCartItemEntity.variations = v.map(createVariation);
  }
  if (cartItemEntity.variationsGroups) {
    quoteCartItemEntity.variationsGroups = vG.map(createGroup);
  }
  return quoteCartItemEntity;
}

const sliceCartItem = createSlice({
  initialState: {
    cartItem: {},
    fetchingPrice: false,
    index: 0,
    savingCartItem: false,
  },
  name: 'cartItemState',
  reducers: {
    cartItemFetchQuote: (state: any) => {
      state.fetchingPrice = true;
    },
    cartItemFetchQuoteError: (state: any) => {
      state.fetchingPrice = false;
    },
    cartItemFetchQuoteSuccess: (state: any, action: PayloadAction<any>) => {
      const { cartItem } = action.payload;
      if (cartItem.variations) {
        state.cartItem.variations = cartItem.variations;
      }
      if (cartItem.variationsGroups) {
        state.cartItem.variationsGroups = cartItem.variationsGroups;
      }
      if (cartItem.product) {
        state.cartItem.product = cartItem.product;
      }
      state.cartItem.taxType = cartItem.taxType;
      state.cartItem.quantity = cartItem.quantity;
      state.cartItem.totalCost = cartItem.totalCost;
      state.cartItem.costPerUnit = cartItem.costPerUnit;
      state.cartItem.taxAmount = cartItem.taxAmount;
      state.fetchingPrice = false;
    },
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
