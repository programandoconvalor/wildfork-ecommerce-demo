"use client";

import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";

import { store } from "./store";
import {
  hydrateCart,
  selectCartItems,
} from "@/features/cart/store/cart.slice";

const CART_STORAGE_KEY = "wildfork-cart";

export function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCartHydrated, setIsCartHydrated] =
    useState(false);

  /**
   * Restore cart from localStorage when the application starts.
   */
  useEffect(() => {
    try {
      const storedCart =
        window.localStorage.getItem(
          CART_STORAGE_KEY,
        );

      if (storedCart) {
        const parsedCart: unknown =
          JSON.parse(storedCart);

        if (Array.isArray(parsedCart)) {
          store.dispatch(
            hydrateCart(parsedCart),
          );
        }
      }
    } catch (error) {
      console.error(
        "Failed to restore cart from localStorage:",
        error,
      );
    } finally {
      setIsCartHydrated(true);
    }
  }, []);

  /**
   * Persist cart changes after the initial
   * hydration has completed.
   */
  useEffect(() => {
    if (!isCartHydrated) {
      return;
    }

    const unsubscribe = store.subscribe(() => {
      try {
        const items = selectCartItems(
          store.getState(),
        );

        window.localStorage.setItem(
          CART_STORAGE_KEY,
          JSON.stringify(items),
        );
      } catch (error) {
        console.error(
          "Failed to persist cart to localStorage:",
          error,
        );
      }
    });

    return unsubscribe;
  }, [isCartHydrated]);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}