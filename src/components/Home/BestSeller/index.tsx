"use client";

import React, { useMemo } from "react";
import Image from "next/image";

import SingleItem from "./SingleItem";

import { useProducts } from "@/features/products/hooks/use-products";
import type { Product } from "@/features/products/types/product.types";

/**
 * =========================================================
 * BEST SELLER
 * =========================================================
 *
 * Displays a dynamic selection of products for the
 * Best Sellers section.
 *
 * Selection strategy:
 *
 * 1. Load products from the Products API.
 * 2. Detect the categories used by New Arrivals.
 * 3. Group all products by category.
 * 4. Prefer a category not already used by New Arrivals.
 * 5. Return up to six products.
 *
 * The API Product type remains the canonical product model.
 */
const BestSeller = () => {
  const {
    data,
    isLoading,
    isError,
  } = useProducts();

  /**
   * =========================================================
   * PRODUCTS
   * =========================================================
   *
   * Normalize the API response to the canonical Product type.
   */
  const products: Product[] = (
    data?.products ?? []
  ) as Product[];

  /**
   * =========================================================
   * BEST SELLER PRODUCTS
   * =========================================================
   *
   * Calculates the Best Sellers collection dynamically.
   *
   * No category name is hardcoded.
   */
  const bestSellerProducts = useMemo<Product[]>(() => {
    if (products.length === 0) {
      return [];
    }

    /*
     * -------------------------------------------------------
     * NEW ARRIVAL CATEGORIES
     * -------------------------------------------------------
     *
     * New Arrivals currently use the first four products.
     */
    const newArrivalCategoryIds = new Set<string>(
      products
        .slice(0, 4)
        .map((product) => product.category),
    );

    /*
     * -------------------------------------------------------
     * GROUP PRODUCTS BY CATEGORY
     * -------------------------------------------------------
     */
    const productsByCategory: Record<
      string,
      Product[]
    > = products.reduce<Record<string, Product[]>>(
      (groups, product) => {
        const category = product.category;

        if (!groups[category]) {
          groups[category] = [];
        }

        groups[category].push(product);

        return groups;
      },
      {},
    );

    /*
     * -------------------------------------------------------
     * ALTERNATIVE CATEGORIES
     * -------------------------------------------------------
     *
     * Exclude categories already represented by
     * New Arrivals and prioritize the category with
     * the largest number of products.
     */
    const alternativeCategories = Object.entries(
      productsByCategory,
    )
      .filter(
        ([category]) =>
          !newArrivalCategoryIds.has(category),
      )
      .sort(
        (
          [, productsA],
          [, productsB],
        ) => productsB.length - productsA.length,
      );

    /*
     * -------------------------------------------------------
     * PREFERRED CATEGORY
     * -------------------------------------------------------
     */
    if (alternativeCategories.length > 0) {
      const [, categoryProducts] =
        alternativeCategories[0];

      return categoryProducts.slice(0, 6);
    }

    /*
     * -------------------------------------------------------
     * FALLBACK
     * -------------------------------------------------------
     *
     * If every category is already represented by
     * New Arrivals, use products outside the first four.
     */
    return products
      .filter(
        (product) =>
          !products
            .slice(0, 4)
            .some(
              (newProduct) =>
                newProduct.id === product.id,
            ),
      )
      .slice(0, 6);
  }, [products]);

  /**
   * =========================================================
   * LOADING STATE
   * =========================================================
   */
  if (isLoading) {
    return (
      <section
        className="overflow-hidden py-15"
        aria-busy="true"
        aria-label="Loading best sellers"
      >
        <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <div className="mb-10">
            <div className="h-5 w-28 animate-pulse rounded bg-gray-1" />

            <div className="mt-2 h-8 w-48 animate-pulse rounded bg-gray-1" />
          </div>

          <div className="grid grid-cols-1 gap-7.5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map(
              (_, index) => (
                <div key={index}>
                  <div className="h-[270px] animate-pulse rounded-lg bg-gray-1" />

                  <div className="mt-4 h-4 w-20 animate-pulse rounded bg-gray-1" />

                  <div className="mt-3 h-5 w-full animate-pulse rounded bg-gray-1" />

                  <div className="mt-3 h-5 w-24 animate-pulse rounded bg-gray-1" />
                </div>
              ),
            )}
          </div>
        </div>
      </section>
    );
  }

  /**
   * =========================================================
   * ERROR STATE
   * =========================================================
   */
  if (isError) {
    return (
      <section className="overflow-hidden py-15">
        <div className="mx-auto flex min-h-[250px] w-full max-w-[1170px] items-center justify-center px-4 sm:px-8 xl:px-0">
          <div
            className="max-w-md text-center"
            role="alert"
          >
            <h2 className="text-xl font-semibold text-dark">
              Unable to load best sellers
            </h2>

            <p className="mt-2 text-sm leading-6 text-dark-4">
              We could not load the products at this
              time. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  /**
   * =========================================================
   * EMPTY STATE
   * =========================================================
   */
  if (bestSellerProducts.length === 0) {
    return (
      <section className="overflow-hidden py-15">
        <div className="mx-auto flex min-h-[200px] w-full max-w-[1170px] items-center justify-center px-4 sm:px-8 xl:px-0">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-dark">
              No best sellers available
            </h2>

            <p className="mt-2 text-sm leading-6 text-dark-4">
              There are currently no products available
              for this section.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden py-15">
      <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
        {/* =====================================================
            SECTION TITLE
            ===================================================== */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <span className="mb-1.5 flex items-center gap-2.5 font-medium text-dark">
              <Image
                src="/images/icons/icon-07.svg"
                alt=""
                aria-hidden="true"
                width={17}
                height={17}
              />

              This Month
            </span>

            <h2 className="text-xl font-semibold text-dark xl:text-heading-5">
              Best Sellers
            </h2>
          </div>
        </div>

        {/* =====================================================
            BEST SELLER PRODUCTS
            ===================================================== */}
        <div className="grid grid-cols-1 gap-7.5 sm:grid-cols-2 lg:grid-cols-3">
          {bestSellerProducts.map((product) => (
            <SingleItem
              key={product.id}
              item={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSeller;