"use client";

import Image from "next/image";
import Link from "next/link";

import type { Product } from "../types/product.types";
import { AddToCartButton } from "./AddToCartButton";

type ProductCardProps = {
  product: Product;
};

/**
 * =========================================================
 * PRODUCT RATING
 * =========================================================
 *
 * Displays the rating returned by the API using five stars.
 *
 * Supports:
 * - Full stars
 * - Half stars
 * - Empty stars
 */
function ProductRating({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount: number;
}) {
  const normalizedRating = Math.min(
    Math.max(rating, 0),
    5,
  );

  const fullStars = Math.floor(
    normalizedRating,
  );

  const hasHalfStar =
    normalizedRating - fullStars >= 0.5;

  return (
    <div
      className="flex min-w-0 items-center gap-2"
      aria-label={`Rating ${normalizedRating.toFixed(
        1,
      )} out of 5`}
    >
      {/* Stars */}
      <div
        className="flex shrink-0 items-center gap-0.5"
        aria-hidden="true"
      >
        {Array.from({
          length: 5,
        }).map((_, index) => {
          const isFull =
            index < fullStars;

          const isHalf =
            !isFull &&
            index === fullStars &&
            hasHalfStar;

          if (isHalf) {
            return (
              <span
                key={index}
                className="bg-[linear-gradient(90deg,#FBBF24_50%,#D1D5DB_50%)] bg-clip-text text-[13px] leading-none text-transparent"
              >
                ★
              </span>
            );
          }

          return (
            <span
              key={index}
              className={
                isFull
                  ? "text-[13px] leading-none text-yellow"
                  : "text-[13px] leading-none text-gray-4"
              }
            >
              ★
            </span>
          );
        })}
      </div>

      {/* Numeric rating */}
      <span className="shrink-0 text-xs font-semibold text-dark">
        {normalizedRating.toFixed(1)}
      </span>

      {/* Reviews */}
      {reviewCount > 0 && (
        <>
          <span
            className="text-gray-4"
            aria-hidden="true"
          >
            ·
          </span>

          <span className="truncate text-xs text-dark-4">
            {reviewCount}{" "}
            {reviewCount === 1
              ? "review"
              : "reviews"}
          </span>
        </>
      )}
    </div>
  );
}

/**
 * =========================================================
 * PRODUCT CARD
 * =========================================================
 *
 * Responsive ecommerce product card.
 *
 * Visual hierarchy:
 *
 * 1. Product image
 * 2. Category
 * 3. Product title
 * 4. Rating
 * 5. Price
 * 6. Availability
 * 7. Add to cart
 */
export function ProductCard({
  product,
}: ProductCardProps) {
  const isInStock =
    product.stock > 0;

  const reviewCount =
    product.reviews?.length ?? 0;

  return (
    <article
      className="
        group
        flex
        h-full
        min-w-0
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-gray-3
        bg-white
        shadow-1
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-gray-4
        hover:shadow-2
        focus-within:border-orange
        focus-within:ring-1
        focus-within:ring-orange/20
      "
    >
      {/* =====================================================
          IMAGE AREA
          ===================================================== */}

      <Link
        href={`/products/${product.id}`}
        aria-label={`View ${product.title}`}
        className="
          relative
          block
          aspect-square
          overflow-hidden
          bg-gray-1
        "
      >
        {/* Subtle image background */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,#FFFFFF_0%,#F9FAFB_72%)]
          "
          aria-hidden="true"
        />

        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          priority={false}
          className="
            relative
            z-10
            object-contain
            p-6
            transition-transform
            duration-500
            ease-out
            group-hover:scale-105
          "
          sizes="
            (max-width: 639px) 100vw,
            (max-width: 1023px) 50vw,
            (max-width: 1279px) 33vw,
            30vw
          "
        />

        {/* Image bottom gradient */}
        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            z-20
            h-12
            bg-gradient-to-t
            from-black/[0.03]
            to-transparent
          "
          aria-hidden="true"
        />
      </Link>

      {/* =====================================================
          CONTENT
          ===================================================== */}

      <div className="flex flex-1 flex-col p-4 sm:p-5">

        {/* ===================================================
            CATEGORY
            =================================================== */}

        <span
          className="
            text-[11px]
            font-semibold
            uppercase
            tracking-[0.08em]
            text-dark-4
          "
        >
          {product.category}
        </span>

        {/* ===================================================
            TITLE
            =================================================== */}

        <Link
          href={`/products/${product.id}`}
          className="mt-1.5 block"
        >
          <h2
            className="
              line-clamp-2
              min-h-[44px]
              text-[15px]
              font-semibold
              leading-[22px]
              text-dark
              transition-colors
              duration-200
              group-hover:text-orange
            "
          >
            {product.title}
          </h2>
        </Link>

        {/* ===================================================
            RATING
            =================================================== */}

        <div className="mt-3">
          <ProductRating
            rating={product.rating}
            reviewCount={reviewCount}
          />
        </div>

        {/* ===================================================
            PRICE
            =================================================== */}

        <div className="mt-4">
          <span
            className="
              text-xl
              font-bold
              leading-none
              tracking-tight
              text-orange
              sm:text-[21px]
            "
          >
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* ===================================================
            AVAILABILITY
            =================================================== */}

        <div className="mt-3">
          {isInStock ? (
            <span
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-full
                bg-green-light-6
                px-2.5
                py-1
                text-[11px]
                font-semibold
                text-green-dark
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-green
                "
                aria-hidden="true"
              />

              In stock
            </span>
          ) : (
            <span
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-full
                bg-red-light-6
                px-2.5
                py-1
                text-[11px]
                font-semibold
                text-red-dark
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-red
                "
                aria-hidden="true"
              />

              Out of stock
            </span>
          )}
        </div>

        {/* ===================================================
            CTA
            =================================================== */}

        <div className="mt-auto pt-5">
          <AddToCartButton
            product={product}
            className="
              w-full
              rounded-lg
              px-4
              py-3
              text-sm
            "
          />
        </div>
      </div>
    </article>
  );
}