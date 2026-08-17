import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { RootState } from "@/redux/store";
import type { Product } from "@/features/products/types/product.types";
import type { CartItem, CartState } from "../types/cart.types";

const initialState: CartState = {
  items: [],
};

/**
 * Payload used when adding a product to the cart.
 *
 * The product must come from the validated Products API model.
 * Quantity is optional and defaults to one.
 *
 * `discountedPrice` is optional because the current demo
 * uses the API price as the cart price.
 */
export type AddCartItemPayload = Product & {
  quantity?: number;
  discountedPrice?: number;
};

/**
 * Converts a Products API model into the CartItem model.
 *
 * The cart keeps the complete Product information so the
 * persisted cart remains consistent after a page reload.
 */
const normalizeProductToCartItem = (
  product: AddCartItemPayload,
): CartItem => {
  const requestedQuantity = Math.max(
    product.quantity ?? 1,
    1,
  );

  const quantity = Math.min(
    requestedQuantity,
    product.stock,
  );

  return {
    ...product,

    quantity,

    discountedPrice:
      product.discountedPrice ?? product.price,

    /**
     * `imgs` is kept only because some existing UI components
     * may still consume this compatibility structure.
     *
     * New code should use `thumbnail` and `images`.
     */
    imgs: {
      thumbnails:
        product.images.length > 0
          ? [product.images[0]]
          : [product.thumbnail],

      previews:
        product.images.length > 0
          ? product.images
          : [product.thumbnail],
    },
  };
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    /**
     * Adds a product to the cart.
     *
     * Rules:
     *
     * - Products with no stock cannot be added.
     * - Quantity defaults to one.
     * - Quantity cannot exceed available stock.
     * - Existing products increase their current quantity.
     */
    addItem: (
      state,
      action: PayloadAction<AddCartItemPayload>,
    ) => {
      const product = action.payload;

      if (product.stock <= 0) {
        return;
      }

      const requestedQuantity = Math.max(
        product.quantity ?? 1,
        1,
      );

      const existingItem = state.items.find(
        (item) => item.id === product.id,
      );

      if (existingItem) {
        existingItem.quantity = Math.min(
          existingItem.quantity +
            requestedQuantity,
          existingItem.stock,
        );

        return;
      }

      const cartItem =
        normalizeProductToCartItem(product);

      if (cartItem.quantity <= 0) {
        return;
      }

      state.items.push(cartItem);
    },

    /**
     * Removes a product completely from the cart.
     */
    removeItem: (
      state,
      action: PayloadAction<number>,
    ) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload,
      );
    },

    /**
     * Updates the quantity of an existing cart item.
     *
     * Quantity <= 0 removes the item.
     *
     * Quantity above available stock is clamped
     * to the current stock value.
     */
    updateQuantity: (
      state,
      action: PayloadAction<{
        productId: number;
        quantity: number;
      }>,
    ) => {
      const {
        productId,
        quantity,
      } = action.payload;

      const item = state.items.find(
        (cartItem) =>
          cartItem.id === productId,
      );

      if (!item) {
        return;
      }

      if (quantity <= 0) {
        state.items = state.items.filter(
          (cartItem) =>
            cartItem.id !== productId,
        );

        return;
      }

      item.quantity = Math.min(
        quantity,
        item.stock,
      );
    },

    /**
     * Removes all products from the cart.
     */
    clearCart: (state) => {
      state.items = [];
    },

    /**
     * Restores the cart from persisted localStorage data.
     *
     * Persisted data is normalized before being stored
     * back into Redux.
     *
     * Invalid products are ignored and quantities are
     * constrained by the current stock value.
     */
    hydrateCart: (
      state,
      action: PayloadAction<CartItem[]>,
    ) => {
      state.items = action.payload
        .filter(
          (item) =>
            item.stock > 0 &&
            item.quantity > 0,
        )
        .map((item) => ({
          ...item,

          quantity: Math.min(
            Math.max(item.quantity, 1),
            item.stock,
          ),

          discountedPrice:
            item.discountedPrice ??
            item.price,

          imgs: {
            thumbnails:
              item.images.length > 0
                ? [item.images[0]]
                : [item.thumbnail],

            previews:
              item.images.length > 0
                ? item.images
                : [item.thumbnail],
          },
        }));
    },
  },
});

/*
 * =========================================================
 * ACTIONS
 * =========================================================
 */

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  hydrateCart,
} = cartSlice.actions;

/*
 * =========================================================
 * SELECTORS
 * =========================================================
 */

/**
 * Returns all products currently stored in the cart.
 */
export const selectCartItems = (
  state: RootState,
): CartItem[] => {
  return state.cart.items;
};

/**
 * Returns the total number of individual products
 * currently in the cart.
 */
export const selectCartItemCount =
  createSelector(
    [selectCartItems],
    (items) =>
      items.reduce(
        (total, item) =>
          total + item.quantity,
        0,
      ),
  );

/**
 * Calculates the cart subtotal.
 */
export const selectCartSubtotal =
  createSelector(
    [selectCartItems],
    (items) =>
      items.reduce(
        (total, item) =>
          total +
          item.discountedPrice *
            item.quantity,
        0,
      ),
  );

/**
 * Backwards-compatible selector name used by
 * existing cart UI components.
 */
export const selectTotalPrice =
  selectCartSubtotal;

export default cartSlice.reducer;