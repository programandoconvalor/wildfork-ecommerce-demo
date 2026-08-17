"use client";

import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "@/redux/store";
import {
  removeItem,
  updateQuantity,
} from "@/features/cart/store/cart.slice";

type SingleItemProps = {
  item: {
    id: number;
    title: string;
    price: number;
    discountedPrice: number;
    quantity: number;
    stock: number;
    thumbnail?: string;
    images?: string[];
    imgs?: {
      thumbnails?: string[];
      previews?: string[];
    };
  };
};

/**
 * Single cart item used inside the cart sidebar.
 *
 * Supports:
 * - Product image
 * - Product title
 * - Current price
 * - Quantity controls
 * - Product removal
 * - Stock-aware quantity limits
 *
 * Visual language:
 * - Dark blue as the primary action color
 * - Orange as the interaction/hover color
 */
const SingleItem = ({ item }: SingleItemProps) => {
  const dispatch = useDispatch<AppDispatch>();

  /**
   * ---------------------------------------------------------
   * IMAGE
   * ---------------------------------------------------------
   *
   * Prefer the normalized cart image structure.
   * Keep support for the legacy imgs structure because
   * persisted cart data may still contain it.
   */
  const thumbnail =
    item.thumbnail ||
    item.imgs?.thumbnails?.[0] ||
    item.images?.[0] ||
    "";

  /**
   * ---------------------------------------------------------
   * QUANTITY STATE
   * ---------------------------------------------------------
   */
  const isMinimumQuantity = item.quantity <= 1;

  const hasStockLimit =
    item.stock > 0;

  const isMaximumQuantity =
    hasStockLimit &&
    item.quantity >= item.stock;

  /**
   * ---------------------------------------------------------
   * REMOVE PRODUCT
   * ---------------------------------------------------------
   */
  const handleRemoveFromCart = () => {
    dispatch(removeItem(item.id));
  };

  /**
   * ---------------------------------------------------------
   * DECREASE QUANTITY
   * ---------------------------------------------------------
   */
  const handleDecrease = () => {
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
   * ---------------------------------------------------------
   * INCREASE QUANTITY
   * ---------------------------------------------------------
   *
   * Never allow the cart quantity to exceed the
   * available product stock.
   */
  const handleIncrease = () => {
    if (isMaximumQuantity) {
      return;
    }

    dispatch(
      updateQuantity({
        productId: item.id,
        quantity: item.quantity + 1,
      }),
    );
  };

  return (
    <div className="flex items-start justify-between gap-4">
      {/* =====================================================
          PRODUCT
          ===================================================== */}

      <div className="flex min-w-0 w-full items-start gap-4">
        {/* =================================================
            IMAGE
            ================================================= */}

        <div className="flex h-[90px] w-[90px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-1">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={item.title}
              width={100}
              height={100}
              className="h-full w-full object-contain p-2"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center text-xs text-dark-4"
              aria-label="Product image unavailable"
            >
              No image
            </div>
          )}
        </div>

        {/* =================================================
            PRODUCT INFORMATION
            ================================================= */}

        <div className="min-w-0 flex-1">
          <h3 className="mb-1 line-clamp-2 font-medium leading-5 text-dark">
            {item.title}
          </h3>

          <p className="mb-3 text-sm font-semibold text-orange">
            ${Number(item.discountedPrice).toFixed(2)}
          </p>

          {/* =================================================
              QUANTITY
              ================================================= */}

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-dark-4">
              Quantity:
            </span>

            <div className="flex items-center overflow-hidden rounded-lg border border-gray-3 bg-white">
              {/* Decrease */}
              <button
                type="button"
                onClick={handleDecrease}
                disabled={isMinimumQuantity}
                aria-label={`Decrease quantity of ${item.title}`}
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  text-lg
                  font-medium
                  text-dark
                  transition-colors
                  duration-200
                  hover:bg-orange
                  hover:text-white
                  focus:outline-none
                  focus:ring-2
                  focus:ring-orange
                  focus:ring-inset
                  disabled:cursor-not-allowed
                  disabled:text-gray-3
                  disabled:hover:bg-transparent
                  disabled:hover:text-gray-3
                "
              >
                −
              </button>

              {/* Quantity */}
              <span
                className="
                  flex
                  h-8
                  min-w-8
                  items-center
                  justify-center
                  border-x
                  border-gray-3
                  px-2
                  text-sm
                  font-semibold
                  text-dark
                "
                aria-label={`Quantity ${item.quantity}`}
              >
                {item.quantity}
              </span>

              {/* Increase */}
              <button
                type="button"
                onClick={handleIncrease}
                disabled={isMaximumQuantity}
                aria-label={`Increase quantity of ${item.title}`}
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  text-lg
                  font-medium
                  text-dark
                  transition-colors
                  duration-200
                  hover:bg-orange
                  hover:text-white
                  focus:outline-none
                  focus:ring-2
                  focus:ring-orange
                  focus:ring-inset
                  disabled:cursor-not-allowed
                  disabled:text-gray-3
                  disabled:hover:bg-transparent
                  disabled:hover:text-gray-3
                "
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          REMOVE
          ===================================================== */}

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
          rounded-lg
          border
          border-gray-3
          bg-gray-1
          text-dark-4
          transition-all
          duration-200
          hover:border-orange
          hover:bg-orange
          hover:text-white
          focus:outline-none
          focus:ring-2
          focus:ring-orange
          focus:ring-offset-2
          active:scale-95
        "
      >
        <svg
          className="fill-current"
          width="20"
          height="20"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.45017 2.06252H12.5498C12.7482 2.06239 12.921 2.06228 13.0842 2.08834C13.7289 2.19129 14.2868 2.59338 14.5883 3.17244C14.6646 3.319 14.7192 3.48298 14.7818 3.6712L14.8841 3.97819C14.9014 4.03015 14.9064 4.04486 14.9105 4.05645C15.0711 4.50022 15.4873 4.80021 15.959 4.81217C15.9714 4.81248 15.9866 4.81254 16.0417 4.81254H18.7917C19.1714 4.81254 19.4792 5.12034 19.4792 5.50004C19.4792 5.87973 19.1714 6.18754 18.7917 6.18754H3.20825C2.82856 6.18754 2.52075 5.87973 2.52075 5.50004C2.52075 5.12034 2.82856 4.81254 3.20825 4.81254H5.95833C6.01337 4.81254 6.02856 4.81248 6.04097 4.81217C6.51273 4.80021 6.92892 4.50024 7.08944 4.05647C7.09366 4.0448 7.09852 4.03041 7.11592 3.97819L7.21823 3.67122C7.28083 3.48301 7.33538 3.319 7.41171 3.17244C7.71324 2.59339 8.27112 2.19129 8.91581 2.08834C9.079 2.06228 9.25181 2.06239 9.45017 2.06252ZM8.25739 4.81254C8.30461 4.71993 8.34645 4.6237 8.38245 4.52419C8.39338 4.49397 8.4041 4.4618 8.41787 4.42048L8.50936 4.14601C8.59293 3.8953 8.61217 3.84416 8.63126 3.8075C8.73177 3.61448 8.91773 3.48045 9.13263 3.44614C9.17345 3.43962 9.22803 3.43754 9.49232 3.43754H12.5077C12.772 3.43754 12.8265 3.43962 12.8674 3.44614C13.0823 3.48045 13.2682 3.61449 13.3687 3.8075C13.3878 3.84416 13.4071 3.89529 13.4906 4.14601L13.5821 4.42031L13.6176 4.52421C13.6535 4.62372 13.6954 4.71994 13.7426 4.81254H8.25739Z"
          />

          <path
            d="M5.42208 7.74597C5.39683 7.36711 5.06923 7.08047 4.69038 7.10572C4.31152 7.13098 4.02487 7.45858 4.05013 7.83743L4.47496 14.2099C4.55333 15.3857 4.61663 16.3355 4.76511 17.0808C4.91947 17.8557 5.18203 18.5029 5.72432 19.0103C6.26662 19.5176 6.92987 19.7365 7.7133 19.839C8.46682 19.9376 9.41871 19.9376 10.5971 19.9375H11.4028C12.5812 19.9376 13.5332 19.9376 14.2867 19.839C15.0701 19.7365 15.7334 19.5176 16.2757 19.0103C16.818 18.5029 17.0805 17.8557 17.2349 17.0808C17.3834 16.3355 17.4467 15.3857 17.525 14.2099L17.9499 7.83743C17.9751 7.45858 17.6885 7.13098 17.3096 7.10572C16.9308 7.08047 16.6032 7.36711 16.5779 7.74597L16.1563 14.0702C16.0739 15.3057 16.0152 16.1654 15.8864 16.8122C15.7614 17.4396 15.5869 17.7717 15.3363 18.0062C15.0857 18.2406 14.7427 18.3926 14.1084 18.4756C13.4544 18.5612 12.5927 18.5625 11.3545 18.5625H10.6455C9.40727 18.5625 8.54559 18.5612 7.89164 18.4756C7.25731 18.3926 6.91433 18.2406 6.6637 18.0062C6.41307 17.7717 6.2386 17.4396 6.11361 16.8122C5.98476 16.1654 5.92607 15.3057 5.8437 14.0702L5.42208 7.74597Z"
          />

          <path
            d="M8.63993 9.39928C9.01774 9.3615 9.35464 9.63715 9.39242 10.015L9.85076 14.5983C9.88854 14.9761 9.61289 15.313 9.23508 15.3508C8.85727 15.3886 8.52036 15.1129 8.48258 14.7351L8.02425 10.1518C7.98647 9.77397 8.26212 9.43706 8.63993 9.39928Z"
          />

          <path
            d="M13.3601 9.39928C13.7379 9.43706 14.013 9.77397 13.9758 10.1518L13.5174 14.7351C13.4796 15.1129 13.1427 15.3886 12.7649 15.3508C12.3871 15.313 12.1115 14.9761 12.1492 14.5983L12.6076 10.015C12.6454 9.63715 12.9823 9.3615 13.3601 9.39928Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SingleItem;