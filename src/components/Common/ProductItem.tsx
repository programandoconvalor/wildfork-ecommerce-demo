"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import type { Product } from "@/features/products/types/product.types";
import type { AppDispatch } from "@/redux/store";

import { updateproductDetails } from "@/redux/features/product-details";
import { addItem } from "@/features/cart/store/cart.slice";

type ProductItemProps = {
  item: Product;
};

/**
 * ProductItem
 *
 * Reusable product card used across the ecommerce catalog.
 *
 * Responsibilities:
 * - Display product information.
 * - Navigate to product details.
 * - Add available products to the cart.
 * - Prevent adding products without stock.
 */
const ProductItem = ({ item }: ProductItemProps) => {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  /*
   * =========================================================
   * PRODUCT DETAILS
   * =========================================================
   *
   * Stores the selected product in Redux before navigating
   * to the product detail page.
   */
  const handleProductDetails = () => {
    dispatch(updateproductDetails({ ...item }));
  };

  /*
   * =========================================================
   * ADD TO CART
   * =========================================================
   *
   * Uses the current cart action (`addItem`) and keeps the
   * complete Product model in the cart.
   *
   * Only products with available stock can be added.
   */
  const handleAddToCart = () => {
    if (item.stock <= 0) {
      return;
    }

    dispatch(
      addItem({
        ...item,
        quantity: 1,
        discountedPrice: item.price,
      }),
    );

    router.push(`/products/${item.id}`);
  };

  /*
   * =========================================================
   * AVAILABILITY
   * =========================================================
   */
  const isInStock = item.stock > 0;

  return (
    <article className="group">
      {/* =====================================================
          PRODUCT IMAGE
          ===================================================== */}
      <div className="relative mb-4 flex min-h-[270px] items-center justify-center overflow-hidden rounded-lg bg-gray-1">
        <Link
          href={`/products/${item.id}`}
          onClick={handleProductDetails}
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
            transition-all
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
              rounded-[5px]
              bg-dark
              px-5
              py-[7px]
              text-custom-sm
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
            "
          >
            {isInStock ? "Add to cart" : "Out of stock"}
          </button>
        </div>
      </div>

      {/* =====================================================
          CATEGORY
          ===================================================== */}
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-dark-4">
        {item.category}
      </p>

      {/* =====================================================
          PRODUCT TITLE
          ===================================================== */}
      <h3
        className="
          mb-1.5
          font-medium
          text-dark
          transition-colors
          duration-200
          hover:text-orange
        "
      >
        <Link
          href={`/products/${item.id}`}
          onClick={handleProductDetails}
          className="line-clamp-2"
        >
          {item.title}
        </Link>
      </h3>

      {/* =====================================================
          PRICE + AVAILABILITY
          ===================================================== */}
      <div className="flex items-center gap-3">
        <span className="text-lg font-semibold text-red">
          ${item.price.toFixed(2)}
        </span>

        {/* =================================================
            AVAILABILITY
            ================================================= */}
        <span
          className={`text-sm font-medium ${
            isInStock ? "text-dark-4" : "text-red"
          }`}
        >
          {isInStock ? "In stock" : "Out of stock"}
        </span>
      </div>
    </article>
  );
};

export default ProductItem;