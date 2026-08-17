"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";

import type { Product } from "@/features/products/types/product.types";
import type { AppDispatch } from "@/redux/store";

import { addItem } from "@/features/cart/store/cart.slice";

type SingleItemProps = {
  /**
   * Product received from the Products API.
   */
  item: Product;
};

/**
 * =========================================================
 * BEST SELLER PRODUCT ITEM
 * =========================================================
 *
 * Product card used by the Best Sellers section.
 *
 * Responsibilities:
 *
 * - Display product image
 * - Display rating and review count
 * - Display category
 * - Display product title
 * - Display price
 * - Display stock availability
 * - Add the product to the cart
 *
 * The component uses the canonical Product model from
 * features/products/types/product.types.
 *
 * Cart state is managed exclusively through the modern
 * Redux Toolkit `addItem` action.
 */
const SingleItem = ({ item }: SingleItemProps) => {
  const dispatch = useDispatch<AppDispatch>();

  /*
   * =========================================================
   * PRODUCT DATA
   * =========================================================
   *
   * The Products API provides the canonical values directly.
   */

  const rating = Math.min(
    Math.max(item.rating ?? 0, 0),
    5,
  );

  const reviewCount = Array.isArray(item.reviews)
    ? item.reviews.length
    : 0;

  const isInStock = item.stock > 0;

  /*
   * =========================================================
   * ADD TO CART
   * =========================================================
   *
   * Adds one product to the Redux cart.
   *
   * The cart slice is responsible for:
   *
   * - validating stock
   * - normalizing the product
   * - preventing quantities above available stock
   */
  const handleAddToCart = () => {
    if (!isInStock) {
      return;
    }

    dispatch(
      addItem({
        ...item,
        quantity: 1,
        discountedPrice: item.price,
      }),
    );
  };

  return (
    <article className="group">
      {/* =====================================================
          PRODUCT IMAGE
          ===================================================== */}
      <div className="relative mb-4 flex min-h-[270px] items-center justify-center overflow-hidden rounded-lg bg-gray-1">
        <Link
          href={`/products/${item.id}`}
          aria-label={`View ${item.title}`}
          className="flex h-full w-full items-center justify-center"
        >
          <Image
            src={item.thumbnail}
            alt={item.title}
            width={250}
            height={250}
            className="
              h-auto
              max-h-[250px]
              w-auto
              max-w-[90%]
              object-contain
              transition-transform
              duration-300
              group-hover:scale-105
            "
          />
        </Link>

        {/* =================================================
            ADD TO CART
            ================================================= */}
        <div
          className="
            absolute
            bottom-0
            left-0
            flex
            w-full
            translate-y-full
            items-center
            justify-center
            pb-5
            transition-transform
            duration-200
            group-hover:translate-y-0
          "
        >
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!isInStock}
            aria-label={
              isInStock
                ? `Add ${item.title} to cart`
                : `${item.title} is out of stock`
            }
            className="
              inline-flex
              items-center
              justify-center
              rounded-md
              bg-dark
              px-7
              py-2.5
              text-sm
              font-medium
              text-white
              shadow-1
              transition-all
              duration-200

              hover:-translate-y-0.5
              hover:bg-orange
              hover:shadow-2

              focus:outline-none
              focus:ring-2
              focus:ring-orange
              focus:ring-offset-2

              active:translate-y-0

              disabled:cursor-not-allowed
              disabled:bg-gray-3
              disabled:text-dark-4
              disabled:shadow-none
              disabled:hover:translate-y-0
              disabled:hover:bg-gray-3
              disabled:hover:shadow-none
            "
          >
            {isInStock ? "Add to cart" : "Out of stock"}
          </button>
        </div>
      </div>

      {/* =====================================================
          RATING
          ===================================================== */}
      {rating > 0 && (
        <div className="mb-2 flex items-center gap-2.5">
          <div
            className="flex items-center gap-1"
            aria-label={`Rating ${rating.toFixed(1)} out of 5`}
          >
            {Array.from({ length: 5 }).map(
              (_, index) => {
                const starNumber = index + 1;

                const isFilled =
                  starNumber <= Math.round(rating);

                return (
                  <svg
                    key={starNumber}
                    width="14"
                    height="14"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M10 1.66675L12.575 6.88341L18.3333 7.72091L14.1667 11.7792L15.15 17.5134L10 14.8084L4.85 17.5134L5.83333 11.7792L1.66667 7.72091L7.425 6.88341L10 1.66675Z"
                      fill={
                        isFilled
                          ? "#FBBF24"
                          : "none"
                      }
                      stroke="#FBBF24"
                      strokeWidth="1"
                    />
                  </svg>
                );
              },
            )}
          </div>

          {reviewCount > 0 && (
            <span className="text-custom-sm text-dark-4">
              ({reviewCount})
            </span>
          )}
        </div>
      )}

      {/* =====================================================
          CATEGORY
          ===================================================== */}
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-dark-4">
        {item.category}
      </span>

      {/* =====================================================
          TITLE
          ===================================================== */}
      <h3
        className="
          mb-2
          line-clamp-2
          font-medium
          text-dark
          transition-colors
          duration-200
          hover:text-orange
        "
      >
        <Link
          href={`/products/${item.id}`}
          aria-label={`View ${item.title}`}
        >
          {item.title}
        </Link>
      </h3>

      {/* =====================================================
          PRICE
          ===================================================== */}
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold text-red">
          ${item.price.toFixed(2)}
        </span>
      </div>

      {/* =====================================================
          STOCK
          ===================================================== */}
      <p
        className={`mt-1 text-sm font-medium ${
          isInStock
            ? "text-dark-4"
            : "text-red"
        }`}
      >
        {isInStock
          ? "In stock"
          : "Out of stock"}
      </p>
    </article>
  );
};

export default SingleItem;