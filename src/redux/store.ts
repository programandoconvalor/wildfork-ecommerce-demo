import { configureStore } from "@reduxjs/toolkit";

import quickViewReducer from "./features/quickView-slice";
import productDetailsReducer from "./features/product-details";

import cartReducer from "@/features/cart/store/cart.slice";

import {
  TypedUseSelectorHook,
  useSelector,
} from "react-redux";

export const store = configureStore({
  reducer: {
    quickView: quickViewReducer,
    cart: cartReducer,
    productDetails: productDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector;