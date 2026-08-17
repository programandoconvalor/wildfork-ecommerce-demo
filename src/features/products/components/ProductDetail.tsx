"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import { ProductGallery } from "./ProductGallery";
import { AddToCartButton } from "./AddToCartButton";

import { useProduct } from "../hooks/use-product";

/**
 * =========================================================
 * PRODUCT DETAIL
 * =========================================================
 *
 * Displays the complete information for a product returned
 * by the ecommerce API.
 *
 * Responsibilities:
 *
 * - Retrieve product by route id.
 * - Display product gallery.
 * - Display product information.
 * - Display dynamic stock.
 * - Display quantity selector.
 * - Delegate cart logic to AddToCartButton.
 *
 * The component does not contain static product data.
 */
export function ProductDetail() {
  const params = useParams();

  /**
   * Route:
   *
   * /products/[id]
   *
   * Example:
   *
   * /products/16
   */
  const productId = Number(params.id);

  const [quantity, setQuantity] = useState(1);

  /**
   * =========================================================
   * API
   * =========================================================
   */

  const {
    data: product,
    isLoading,
    isError,
    error,
    refetch,
  } = useProduct(productId);

  /**
   * =========================================================
   * LOADING STATE
   * =========================================================
   *
   * Uses the ecommerce skeleton instead of displaying a
   * generic loading message.
   */
  if (isLoading) {
    return (
      <main className="mx-auto w-full max-w-[1170px] px-4 py-10 sm:px-8 xl:px-0">
        <div className="grid animate-pulse gap-8 lg:grid-cols-2">
          {/* Product image skeleton */}
          <div className="aspect-square rounded-xl bg-gray-1" />

          {/* Product information skeleton */}
          <div className="space-y-5">
            <div className="h-4 w-24 rounded bg-gray-2" />

            <div className="h-10 w-4/5 rounded bg-gray-2" />

            <div className="h-8 w-32 rounded bg-gray-2" />

            <div className="h-5 w-32 rounded bg-gray-2" />

            <div className="h-24 rounded bg-gray-2" />

            <div className="h-12 w-48 rounded bg-gray-2" />
          </div>
        </div>
      </main>
    );
  }

  /**
   * =========================================================
   * ERROR STATE
   * =========================================================
   *
   * Modern ecommerce empty/error state.
   */
  if (isError || !product) {
    return (
      <main className="flex min-h-[calc(100vh-180px)] w-full items-center justify-center bg-gray-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl">
          <div className="overflow-hidden rounded-2xl border border-gray-3 bg-white shadow-1">
            {/* =================================================
                TOP ACCENT
                ================================================= */}
            <div className="h-1.5 w-full bg-brand" />

            <div className="px-6 py-10 text-center sm:px-10 sm:py-14">
              {/* =================================================
                  ICON
                  ================================================= */}
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-1">
                <svg
                  className="h-10 w-10 text-brand"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M6 2L3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6L18 2H6Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M3 6H21"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />

                  <path
                    d="M8 10C8 12.2 9.8 14 12 14C14.2 14 16 12.2 16 10"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* =================================================
                  LABEL
                  ================================================= */}
              <span className="mt-7 inline-flex items-center rounded-full bg-gray-1 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-dark-4">
                Product
              </span>

              {/* =================================================
                  TITLE
                  ================================================= */}
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-dark sm:text-4xl">
                Product not found
              </h1>

              {/* =================================================
                  DESCRIPTION
                  ================================================= */}
              <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-dark-4 sm:text-base">
                The product you are looking for is not available or
                may have been removed from our catalog.
              </p>

              {/* =================================================
                  ERROR DETAILS
                  ================================================= */}
              {error instanceof Error && (
                <p className="mx-auto mt-3 max-w-lg text-xs leading-5 text-dark-4/80">
                  {error.message}
                </p>
              )}

              {/* =================================================
                  ACTIONS
                  ================================================= */}
              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                {/* Browse products */}
                <Link
                  href="/products"
                  className="
                    inline-flex
                    min-h-12
                    items-center
                    justify-center
                    rounded-lg
                    bg-dark
                    px-7
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    shadow-1
                    transition-all
                    duration-200
                    hover:bg-brand
                    hover:shadow-2
                    focus:outline-none
                    focus:ring-2
                    focus:ring-brand/30
                    focus:ring-offset-2
                    active:scale-[0.98]
                  "
                >
                  Browse products
                </Link>

                {/* Try again */}
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="
                    inline-flex
                    min-h-12
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-gray-3
                    bg-white
                    px-7
                    py-3
                    text-sm
                    font-semibold
                    text-dark
                    transition-all
                    duration-200
                    hover:border-dark
                    hover:bg-gray-1
                    focus:outline-none
                    focus:ring-2
                    focus:ring-brand/30
                    focus:ring-offset-2
                    active:scale-[0.98]
                  "
                >
                  Try again
                </button>
              </div>

              {/* =================================================
                  SUPPORTING MESSAGE
                  ================================================= */}
              <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 border-t border-gray-3 pt-6">
                <span
                  className="h-2 w-2 rounded-full bg-brand"
                  aria-hidden="true"
                />

                <p className="text-xs text-dark-4">
                  Try browsing our catalog to find another product.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /**
   * =========================================================
   * PRODUCT AVAILABILITY
   * =========================================================
   */
  const isAvailable = product.stock > 0;

  /**
   * Prevent the quantity from becoming invalid if the API
   * reports a lower stock value than the currently selected
   * quantity.
   */
  const increaseQuantity = () => {
    setQuantity((current) =>
      Math.min(current + 1, product.stock),
    );
  };

  const decreaseQuantity = () => {
    setQuantity((current) =>
      Math.max(current - 1, 1),
    );
  };

  /**
   * =========================================================
   * RATING
   * =========================================================
   *
   * Product ratings are generated from the API value.
   * No fixed rating number is introduced.
   */
  // product.rating may not exist on the product type returned by the API
  const rating = Math.min(
    Math.max(Number((product as any).rating ?? 0), 0),
    5,
  );

  /**
   * =========================================================
   * RENDER
   * =========================================================
   */
  return (
    <main className="mx-auto w-full max-w-[1170px] px-4 py-8 sm:px-8 xl:px-0">

      {/* =====================================================
          BREADCRUMB
          ===================================================== */}

      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex flex-wrap items-center gap-2 text-sm"
      >
        <Link
          href="/products"
          className="text-dark-4 transition-colors duration-200 hover:text-brand"
        >
          Products
        </Link>

        <span className="text-dark-4">/</span>

        <span className="line-clamp-1 text-dark">
          {product.title}
        </span>
      </nav>

      {/* =====================================================
          PRODUCT
          ===================================================== */}

      <section className="grid gap-10 lg:grid-cols-2 lg:items-start">

        {/* ===================================================
            GALLERY
            =================================================== */}

        <ProductGallery
          images={product.images}
          title={product.title}
        />

        {/* ===================================================
            PRODUCT INFORMATION
            =================================================== */}

        <div className="flex flex-col">

          {/* Category */}
          <p className="text-sm font-medium uppercase tracking-wide text-dark-4">
            {product.category}
          </p>

          {/* Product title */}
          <h1 className="mt-2 text-3xl font-semibold leading-tight text-dark xl:text-heading-4">
            {product.title}
          </h1>

          {/* =================================================
              RATING + STOCK
              ================================================= */}

          <div className="mt-4 flex flex-wrap items-center gap-4">

            {/* Dynamic rating */}
            <div
              className="flex items-center gap-1"
              aria-label={`Rating ${rating} out of 5`}
            >
              {Array.from({ length: 5 }).map(
                (_, index) => (
                  <span
                    key={index}
                    className={
                      index < Math.round(rating)
                        ? "text-[#FBBF24]"
                        : "text-gray-3"
                    }
                    aria-hidden="true"
                  >
                    ★
                  </span>
                ),
              )}
            </div>

            {/* Reviews */}
            <span className="text-sm text-dark-4">
              {"reviews" in product
                ? (product as any).reviews ?? 0
                : 0}{" "}
              customer reviews
            </span>

            {/* Stock */}
            <span
              className={
                isAvailable
                  ? "inline-flex items-center gap-1.5 text-sm font-medium text-green-600"
                  : "inline-flex items-center gap-1.5 text-sm font-medium text-red-600"
              }
            >
              <span
                className={
                  isAvailable
                    ? "h-2 w-2 rounded-full bg-green-500"
                    : "h-2 w-2 rounded-full bg-red-500"
                }
                aria-hidden="true"
              />

              {isAvailable
                ? `In stock · ${product.stock} available`
                : "Out of stock"}
            </span>
          </div>

          {/* =================================================
              PRICE
              ================================================= */}

          <div className="mt-5 flex items-center gap-3">
            <span className="text-3xl font-semibold text-brand">
              ${product.price.toFixed(2)}
            </span>
          </div>

          {/* =================================================
              DESCRIPTION
              ================================================= */}

          <div className="mt-7 border-t border-gray-3 pt-7">
            <h2 className="text-lg font-semibold text-dark">
              Product description
            </h2>

            <p className="mt-3 leading-7 text-dark-4">
              {product.description}
            </p>
          </div>

          {/* =================================================
              PRODUCT METADATA
              ================================================= */}

          <div className="mt-7 grid gap-3 border-t border-gray-3 pt-7 sm:grid-cols-2">

            <div>
              <span className="text-sm font-medium text-dark">
                Category
              </span>

              <span className="ml-2 text-sm text-dark-4">
                {product.category}
              </span>
            </div>

            <div>
              <span className="text-sm font-medium text-dark">
                Availability
              </span>

              <span className="ml-2 text-sm text-dark-4">
                {product.stock > 0
                  ? `${product.stock} available`
                  : "Currently unavailable"}
              </span>
            </div>

          </div>

          {/* =================================================
              PURCHASE AREA
              ================================================= */}

          <div className="mt-7 border-t border-gray-3 pt-7">

            <div className="flex flex-wrap items-center gap-4">

              {/* Quantity selector */}
              <div
                className="inline-flex h-12 overflow-hidden rounded-md border border-gray-3 bg-white"
                aria-label="Product quantity"
              >
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={!isAvailable || quantity <= 1}
                  aria-label="Decrease quantity"
                  className="flex w-12 items-center justify-center text-xl text-dark transition-colors duration-200 hover:bg-gray-1 disabled:cursor-not-allowed disabled:text-gray-3"
                >
                  −
                </button>

                <span
                  className="flex w-12 items-center justify-center border-x border-gray-3 text-sm font-medium text-dark"
                  aria-live="polite"
                >
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  disabled={
                    !isAvailable ||
                    quantity >= product.stock
                  }
                  aria-label="Increase quantity"
                  className="flex w-12 items-center justify-center text-xl text-dark transition-colors duration-200 hover:bg-gray-1 disabled:cursor-not-allowed disabled:text-gray-3"
                >
                  +
                </button>
              </div>

              {/* =================================================
                  REUSABLE ADD TO CART BUTTON
                  ================================================= */}

              <AddToCartButton
                product={product}
                quantity={quantity}
                className="min-h-12 min-w-[210px]"
              />

            </div>
          </div>

          {/* =================================================
              SERVICE BENEFITS
              ================================================= */}

          <div className="mt-8 grid gap-3 sm:grid-cols-3">

            <div className="rounded-lg border border-gray-3 bg-gray-1 p-4">
              <h3 className="text-sm font-semibold text-dark">
                Secure checkout
              </h3>

              <p className="mt-1 text-xs leading-5 text-dark-4">
                Safe and reliable shopping experience.
              </p>
            </div>

            <div className="rounded-lg border border-gray-3 bg-gray-1 p-4">
              <h3 className="text-sm font-semibold text-dark">
                Fast delivery
              </h3>

              <p className="mt-1 text-xs leading-5 text-dark-4">
                Delivery information available at checkout.
              </p>
            </div>

            <div className="rounded-lg border border-gray-3 bg-gray-1 p-4">
              <h3 className="text-sm font-semibold text-dark">
                Easy shopping
              </h3>

              <p className="mt-1 text-xs leading-5 text-dark-4">
                Add products to your cart in one click.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}