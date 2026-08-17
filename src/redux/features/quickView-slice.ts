import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { Product } from "@/features/products/types/product.types";

type InitialState = {
  value: Product;
};

const initialState: InitialState = {
  value: {
    id: 0,
    title: "",
    description: "",
    category: "",
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    thumbnail: "",
    images: [],
    reviews: [],
  },
};

export const quickView = createSlice({
  name: "quickView",
  initialState,

  reducers: {
    updateQuickView: (
      _,
      action: PayloadAction<Product>,
    ) => {
      return {
        value: {
          ...action.payload,
        },
      };
    },

    resetQuickView: () => {
      return {
        value: initialState.value,
      };
    },
  },
});

export const {
  updateQuickView,
  resetQuickView,
} = quickView.actions;

export default quickView.reducer;