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

export const productDetails = createSlice({
  name: "productDetails",
  initialState,

  reducers: {
    updateproductDetails: (
      _,
      action: PayloadAction<Product>,
    ) => {
      return {
        value: {
          ...action.payload,
        },
      };
    },
  },
});

export const {
  updateproductDetails,
} = productDetails.actions;

export default productDetails.reducer;