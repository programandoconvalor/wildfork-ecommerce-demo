"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "@/redux/store";
import {
  removeItem,
  updateQuantity,
} from "@/features/cart/store/cart.slice";
import type { CartItem } from "@/features/cart/types/cart.types";

type SingleItemProps = {
  item: CartItem;
};

/**
 * Renders a single product inside the shopping cart.
 *
 * The component supports:
 * - Responsive mobile and desktop layouts
 * - Product removal
 * - Quantity management
 * - Stock-aware quantity limits
 * - Subtotal calculation
 */
const SingleItem = ({ item }: SingleItemProps) => {
  const dispatch = useDispatch<AppDispatch>();

  /**
   * Prefer the legacy thumbnail structure when available,
   * otherwise use the normalized Product thumbnail.
   */
  const imageSrc =
    item.imgs?.thumbnails?.[0] ||
    item.thumbnail ||
    "";

  /**
   * Quantity boundaries.
   */
  const isMinimumQuantity = item.quantity <= 1;

  const isMaximumQuantity =
    item.quantity >= item.stock;

  /**
   * ---------------------------------------------------------
   * REMOVE ITEM
   * ---------------------------------------------------------
   */
  const handleRemoveFromCart = () => {
    dispatch(removeItem(item.id));
  };

  /**
   * ---------------------------------------------------------
   * INCREASE QUANTITY
   * ---------------------------------------------------------
   *
   * Quantity can never exceed the product stock.
   */
  const handleIncreaseQuantity = () => {
    if (item.quantity >= item.stock) {
      return;
    }

    dispatch(
      updateQuantity({
        productId: item.id,
        quantity: item.quantity + 1,
      }),
    );
  };

  /**
   * ---------------------------------------------------------
   * DECREASE QUANTITY
   * ---------------------------------------------------------
   *
   * Quantity cannot be reduced below one.
   */
  const handleDecreaseQuantity = () => {
    if (item.quantity <= 1) {
      return;
    }

    dispatch(
      updateQuantity({
        productId: item.id,
        quantity: item.quantity - 1,
      }),
    );
  };

  /**
   * Current unit price.
   */
  const unitPrice = Number(item.discountedPrice);

  /**
   * Current item subtotal.
   */
  const subtotal = unitPrice * item.quantity;

  return (
    <article className="border-t border-gray-200 p-4 sm:p-6">
      {/* =====================================================
          MOBILE
          ===================================================== */}
      <div className="flex flex-col gap-5 md:hidden">
        <div className="flex gap-4">
          {/* Product image */}
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-md bg-gray-100">
            {imageSrc ? (
              <Image
                width={160}
                height={160}
                src={imageSrc}
                alt={item.title}
                className="h-full w-full object-contain"
              />
            ) : (
              <span className="text-xs text-gray-400">
                No image
              </span>
            )}
          </div>

          {/* Product information */}
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-medium text-gray-900">
              {item.title}
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              ${unitPrice.toFixed(2)}
            </p>
          </div>

          {/* Remove */}
          <button
            type="button"
            onClick={handleRemoveFromCart}
            aria-label={`Remove ${item.title} from cart`}
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-md
              border
              border-gray-200
              bg-gray-50
              text-gray-600
              transition-all
              duration-200
              hover:border-orange
              hover:bg-orange
              hover:text-white
              focus:outline-none
              focus:ring-2
              focus:ring-orange
              focus:ring-offset-2
            "
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 7H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M10 11V17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M14 11V17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M6 7L7 20H17L18 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />

              <path
                d="M9 7V4H15V7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Quantity */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Quantity
          </span>

          <div className="flex items-center overflow-hidden rounded-md border border-gray-200">
            {/* Decrease */}
            <button
              type="button"
              onClick={handleDecreaseQuantity}
              disabled={isMinimumQuantity}
              aria-label="Decrease product quantity"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                text-gray-700
                transition-colors
                duration-200
                hover:bg-orange
                hover:text-white
                focus:outline-none
                focus:ring-2
                focus:ring-orange
                focus:ring-inset
                disabled:cursor-not-allowed
                disabled:text-gray-300
                disabled:hover:bg-transparent
                disabled:hover:text-gray-300
              "
            >
              −
            </button>

            {/* Quantity value */}
            <span className="flex h-10 w-12 items-center justify-center border-x border-gray-200 text-sm font-medium text-gray-900">
              {item.quantity}
            </span>

            {/* Increase */}
            <button
              type="button"
              onClick={handleIncreaseQuantity}
              disabled={isMaximumQuantity}
              aria-label="Increase product quantity"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                text-gray-700
                transition-colors
                duration-200
                hover:bg-orange
                hover:text-white
                focus:outline-none
                focus:ring-2
                focus:ring-orange
                focus:ring-inset
                disabled:cursor-not-allowed
                disabled:text-gray-300
                disabled:hover:bg-transparent
                disabled:hover:text-gray-300
              "
            >
              +
            </button>
          </div>
        </div>

        {/* Subtotal */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <span className="text-sm font-medium text-gray-700">
            Subtotal
          </span>

          <span className="text-base font-semibold text-gray-900">
            ${subtotal.toFixed(2)}
          </span>
        </div>
      </div>

      {/* =====================================================
          DESKTOP
          ===================================================== */}
      <div className="hidden items-center gap-6 md:grid md:grid-cols-[minmax(280px,2fr)_minmax(120px,1fr)_minmax(160px,1fr)_minmax(120px,1fr)_50px]">
        {/* Product */}
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-md bg-gray-100">
            {imageSrc ? (
              <Image
                width={160}
                height={160}
                src={imageSrc}
                alt={item.title}
                className="h-full w-full object-contain"
              />
            ) : (
              <span className="text-xs text-gray-400">
                No image
              </span>
            )}
          </div>

          <h3 className="min-w-0 text-sm font-medium text-gray-900">
            {item.title}
          </h3>
        </div>

        {/* Unit price */}
        <div>
          <p className="text-sm text-gray-900">
            ${unitPrice.toFixed(2)}
          </p>
        </div>

        {/* Quantity */}
        <div>
          <div className="flex w-max items-center overflow-hidden rounded-md border border-gray-200">
            {/* Decrease */}
            <button
              type="button"
              onClick={handleDecreaseQuantity}
              disabled={isMinimumQuantity}
              aria-label="Decrease product quantity"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                text-gray-700
                transition-colors
                duration-200
                hover:bg-orange
                hover:text-white
                focus:outline-none
                focus:ring-2
                focus:ring-orange
                focus:ring-inset
                disabled:cursor-not-allowed
                disabled:text-gray-300
                disabled:hover:bg-transparent
                disabled:hover:text-gray-300
              "
            >
              −
            </button>

            {/* Quantity value */}
            <span className="flex h-10 w-12 items-center justify-center border-x border-gray-200 text-sm font-medium text-gray-900">
              {item.quantity}
            </span>

            {/* Increase */}
            <button
              type="button"
              onClick={handleIncreaseQuantity}
              disabled={isMaximumQuantity}
              aria-label="Increase product quantity"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                text-gray-700
                transition-colors
                duration-200
                hover:bg-orange
                hover:text-white
                focus:outline-none
                focus:ring-2
                focus:ring-orange
                focus:ring-inset
                disabled:cursor-not-allowed
                disabled:text-gray-300
                disabled:hover:bg-transparent
                disabled:hover:text-gray-300
              "
            >
              +
            </button>
          </div>
        </div>

        {/* Subtotal */}
        <div>
          <p className="text-sm font-semibold text-gray-900">
            ${subtotal.toFixed(2)}
          </p>
        </div>

        {/* Remove */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleRemoveFromCart}
            aria-label={`Remove ${item.title} from cart`}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-md
              border
              border-gray-200
              bg-gray-50
              text-gray-600
              transition-all
              duration-200
              hover:border-orange
              hover:bg-orange
              hover:text-white
              focus:outline-none
              focus:ring-2
              focus:ring-orange
              focus:ring-offset-2
            "
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 7H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M10 11V17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M14 11V17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M6 7L7 20H17L18 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />

              <path
                d="M9 7V4H15V7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
};

export default SingleItem;