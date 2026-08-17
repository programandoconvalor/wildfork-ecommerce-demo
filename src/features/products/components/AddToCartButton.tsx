"use client";

import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

import type { AppDispatch } from "@/redux/store";
import { addItem } from "@/features/cart/store/cart.slice";

import type { Product } from "../types/product.types";

type AddToCartButtonProps = {
  /**
   * Product received from the API.
   */
  product: Product;

  /**
   * Quantity to add.
   *
   * Defaults to one item for product cards.
   */
  quantity?: number;

  /**
   * Optional classes supplied by the parent component.
   */
  className?: string;
};

/**
 * =========================================================
 * ADD TO CART BUTTON
 * =========================================================
 *
 * Shared ecommerce CTA.
 *
 * Used by:
 *
 * - Product cards
 * - New Arrivals
 * - Best Sellers
 * - Product Detail
 *
 * Visual behavior:
 *
 * Normal   -> ecommerce dark navy
 * Hover    -> ecommerce orange
 * Focus    -> ecommerce orange
 * Active   -> subtle scale
 * Disabled -> neutral gray
 *
 * Cart logic is centralized here so individual components
 * don't need to duplicate Redux logic.
 */
export function AddToCartButton({
  product,
  quantity = 1,
  className = "",
}: AddToCartButtonProps) {
  const dispatch = useDispatch<AppDispatch>();

  /**
   * Product availability comes directly from the API.
   */
  const isAvailable = product.stock > 0;

  /**
   * ---------------------------------------------------------
   * ADD TO CART
   * ---------------------------------------------------------
   */
  const handleAddToCart = () => {
    if (!isAvailable) {
      return;
    }

    /**
     * Protect the cart from receiving an invalid quantity.
     *
     * Minimum: 1
     * Maximum: available stock
     */
    const safeQuantity = Math.min(
      Math.max(quantity, 1),
      product.stock,
    );

    dispatch(
      addItem({
        ...product,
        quantity: safeQuantity,
        discountedPrice: product.price,
      }),
    );

    toast.success(
      safeQuantity > 1
        ? `${safeQuantity} items added to cart`
        : "Product added to cart",
    );
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={!isAvailable}
      aria-label={
        isAvailable
          ? `Add ${product.title} to cart`
          : `${product.title} is out of stock`
      }
      className={[
        // Layout
        "inline-flex",
        "min-h-12",
        "items-center",
        "justify-center",

        // Shape
        "rounded-lg",

        // Default ecommerce color
        "bg-dark",
        "text-white",

        // Size
        "px-7",
        "py-3",

        // Typography
        "text-sm",
        "font-semibold",

        // Shadow
        "shadow-1",

        // Animation
        "transition-all",
        "duration-200",

        // Hover
        "hover:bg-orange",
        "hover:shadow-2",

        // Active
        "active:scale-[0.98]",

        // Keyboard accessibility
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-orange/30",
        "focus:ring-offset-2",

        // Disabled state
        "disabled:cursor-not-allowed",
        "disabled:bg-gray-3",
        "disabled:text-dark-4",
        "disabled:shadow-none",

        className,
      ].join(" ")}
    >
      {isAvailable ? "Add to cart" : "Out of stock"}
    </button>
  );
}