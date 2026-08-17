"use client";

import React, { useEffect, useMemo, useState } from "react";

import { ProductGrid } from "./ProductGrid";
import { ProductFilters } from "./ProductFilters";
import { useProducts } from "../hooks/use-products";
import { useProductFilters } from "../context/ProductFiltersContext";

import type { Product } from "@/features/products/types/product.types";

type SortOption =
  | "default"
  | "asc"
  | "desc";

const PRODUCTS_PER_PAGE = 10;

/**
 * =========================================================
 * PRODUCT LISTING
 * =========================================================
 *
 * Main catalog container for the /products page.
 *
 * Responsibilities:
 *
 * - Retrieves products from the API.
 * - Builds categories dynamically.
 * - Applies search, category and price sorting locally.
 * - Paginates the derived collection locally.
 * - Provides loading, error and empty states.
 * - Coordinates filters with the product grid.
 */
export function ProductListing() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useProducts();

  const {
    searchQuery,
    category,
    sort,
    setSearchQuery,
    setCategory,
    setSort,
    resetFilters,
  } = useProductFilters();

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  /**
   * =========================================================
   * API PRODUCTS
   * =========================================================
   *
   * Normalize the API collection to the application's
   * canonical Product type.
   */
  const products: Product[] =
    (data?.products ?? []) as Product[];

  /**
   * =========================================================
   * CATEGORIES
   * =========================================================
   */
  const categories = useMemo<string[]>(
    () => {
      const categoryValues: string[] =
        products
          .map(
            (product): string =>
              product.category.trim(),
          )
          .filter(
            (category): category is string =>
              Boolean(category),
          );

      return Array.from(
        new Set<string>(categoryValues),
      ).sort(
        (a: string, b: string) =>
          a.localeCompare(b),
      );
    },
    [products],
  );

  /**
   * =========================================================
   * FILTER + SORT
   * =========================================================
   */
  const filteredProducts = useMemo<Product[]>(
    () => {
      const normalizedSearch =
        searchQuery
          .trim()
          .toLowerCase();

      const result = products.filter(
        (product) => {
          const title =
            product.title.toLowerCase();

          const description =
            product.description.toLowerCase();

          const productCategory =
            product.category
              .trim()
              .toLowerCase();

          const matchesSearch =
            normalizedSearch.length === 0 ||
            title.includes(
              normalizedSearch,
            ) ||
            description.includes(
              normalizedSearch,
            ) ||
            productCategory.includes(
              normalizedSearch,
            );

          const matchesCategory =
            category === "all" ||
            product.category === category;

          return (
            matchesSearch &&
            matchesCategory
          );
        },
      );

      /**
       * Sort on a copy so the original
       * React Query response remains immutable.
       */
      if (sort === "asc") {
        return [...result].sort(
          (a, b) =>
            a.price - b.price,
        );
      }

      if (sort === "desc") {
        return [...result].sort(
          (a, b) =>
            b.price - a.price,
        );
      }

      return result;
    },
    [
      products,
      searchQuery,
      category,
      sort,
    ],
  );

  /**
   * =========================================================
   * PAGINATION
   * =========================================================
   */

  const totalPages = Math.ceil(
    filteredProducts.length /
      PRODUCTS_PER_PAGE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    category,
    sort,
  ]);

  const safeCurrentPage =
    totalPages === 0
      ? 1
      : Math.min(
          currentPage,
          totalPages,
        );

  const startIndex =
    (safeCurrentPage - 1) *
    PRODUCTS_PER_PAGE;

  const endIndex = Math.min(
    startIndex +
      PRODUCTS_PER_PAGE,
    filteredProducts.length,
  );

  const paginatedProducts =
    filteredProducts.slice(
      startIndex,
      endIndex,
    );

  /**
   * =========================================================
   * PAGINATION HANDLERS
   * =========================================================
   */

  const goToPreviousPage = () => {
    setCurrentPage((page) =>
      Math.max(page - 1, 1),
    );
  };

  const goToNextPage = () => {
    setCurrentPage((page) =>
      Math.min(
        page + 1,
        totalPages,
      ),
    );
  };

  /**
   * =========================================================
   * FILTER STATE
   * =========================================================
   */

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    category !== "all" ||
    sort !== "default";

  /**
   * =========================================================
   * LOADING STATE
   * =========================================================
   */

  if (isLoading) {
    return (
      <main className="bg-gray-1">
        <div className="mx-auto w-full max-w-[1170px] px-4 py-10 sm:px-8 xl:px-0">
          <div className="mb-8">
            <div className="h-4 w-24 animate-pulse rounded bg-gray-3" />

            <div className="mt-3 h-9 w-56 animate-pulse rounded bg-gray-3" />
          </div>

          <div className="grid gap-7.5 lg:grid-cols-[260px_1fr]">
            <aside className="hidden lg:block">
              <div className="h-[420px] animate-pulse rounded-lg bg-white" />
            </aside>

            <div className="grid grid-cols-1 gap-7.5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({
                length: PRODUCTS_PER_PAGE,
              }).map((_, index) => (
                <div key={index}>
                  <div className="aspect-square animate-pulse rounded-lg bg-gray-2" />

                  <div className="mt-4 h-3 w-20 animate-pulse rounded bg-gray-2" />

                  <div className="mt-3 h-5 w-full animate-pulse rounded bg-gray-2" />

                  <div className="mt-3 h-5 w-24 animate-pulse rounded bg-gray-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  /**
   * =========================================================
   * ERROR STATE
   * =========================================================
   */

  if (isError) {
    return (
      <main className="bg-gray-1">
        <div className="mx-auto flex min-h-[500px] w-full max-w-[1170px] items-center justify-center px-4 sm:px-8 xl:px-0">
          <div
            className="max-w-md rounded-xl bg-white px-8 py-10 text-center shadow-sm"
            role="alert"
          >
            <h1 className="text-2xl font-semibold text-dark">
              Unable to load products
            </h1>

            <p className="mt-3 text-sm text-dark-4">
              {error instanceof Error
                ? error.message
                : "Something went wrong while loading products."}
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="mt-6 rounded-md bg-dark px-6 py-2.5 text-sm font-medium text-white transition hover:bg-orange"
            >
              Try again
            </button>
          </div>
        </div>
      </main>
    );
  }

  /**
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <main className="overflow-hidden bg-gray-1">
      <div className="mx-auto w-full max-w-[1170px] px-4 py-10 sm:px-8 xl:px-0">
        {/* ===================================================
            PAGE HEADER
            =================================================== */}

        <header className="mb-8">
          <p className="text-sm font-medium text-orange">
            Home / Products
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-dark xl:text-heading-4">
            Explore All Products
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-dark-4">
            Discover products available from our catalog.
          </p>
        </header>

        {/* ===================================================
            CATALOG LAYOUT
            =================================================== */}

        <div className="grid gap-7.5 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* =================================================
              FILTER SIDEBAR
              ================================================= */}

          <ProductFilters
            search={searchQuery}
            category={category}
            sort={sort}
            categories={categories}
            hasActiveFilters={
              hasActiveFilters
            }
            onSearchChange={
              setSearchQuery
            }
            onCategoryChange={
              setCategory
            }
            onSortChange={(value) =>
              setSort(
                value as SortOption,
              )
            }
            onClearFilters={
              resetFilters
            }
          />

          {/* =================================================
              PRODUCT CONTENT
              ================================================= */}

          <section aria-label="Product catalog">
            {/* =================================================
                CATALOG TOOLBAR
                ================================================= */}

            <div className="mb-6 flex flex-col gap-4 rounded-lg border border-gray-3 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p
                  className="text-sm text-dark-4"
                  aria-live="polite"
                >
                  {filteredProducts.length >
                  0 ? (
                    <>
                      Showing{" "}
                      <span className="font-semibold text-dark">
                        {startIndex + 1}
                      </span>
                      –
                      <span className="font-semibold text-dark">
                        {endIndex}
                      </span>{" "}
                      of{" "}
                      <span className="font-semibold text-dark">
                        {
                          filteredProducts.length
                        }
                      </span>{" "}
                      products
                    </>
                  ) : (
                    <>
                      Showing{" "}
                      <span className="font-semibold text-dark">
                        0
                      </span>{" "}
                      products
                    </>
                  )}
                </p>
              </div>

              {/* =================================================
                  MOBILE SORTING
                  ================================================= */}

              <div className="flex items-center gap-3 lg:hidden">
                <label
                  htmlFor="mobile-product-sort"
                  className="text-sm font-medium text-dark"
                >
                  Sort by
                </label>

                <select
                  id="mobile-product-sort"
                  value={sort}
                  onChange={(event) =>
                    setSort(
                      event.target
                        .value as SortOption,
                    )
                  }
                  className="rounded-md border border-gray-3 bg-white px-3 py-2 text-sm text-dark outline-none transition focus:border-orange focus:ring-1 focus:ring-orange"
                >
                  <option value="default">
                    Default
                  </option>

                  <option value="asc">
                    Price: Low to High
                  </option>

                  <option value="desc">
                    Price: High to Low
                  </option>
                </select>
              </div>
            </div>

            {/* =================================================
                EMPTY RESULTS
                ================================================= */}

            {filteredProducts.length ===
            0 ? (
              <section
                className="flex min-h-[420px] flex-col items-center justify-center rounded-xl border border-gray-3 bg-white px-6 text-center"
                aria-live="polite"
              >
                <h2 className="text-xl font-semibold text-dark">
                  No products found
                </h2>

                <p className="mt-2 max-w-md text-sm text-dark-4">
                  {hasActiveFilters
                    ? "Try changing your search or filters."
                    : "There are no products available right now."}
                </p>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={
                      resetFilters
                    }
                    className="mt-6 rounded-md bg-dark px-6 py-2.5 text-sm font-medium text-white transition hover:bg-orange"
                  >
                    Clear filters
                  </button>
                )}
              </section>
            ) : (
              <>
                {/* =============================================
                    PRODUCT GRID
                    ============================================= */}

                <ProductGrid
                  products={
                    paginatedProducts
                  }
                />

                {/* =============================================
                    PAGINATION
                    ============================================= */}

                {totalPages > 1 && (
                  <nav
                    className="mt-10 flex flex-wrap items-center justify-center gap-2"
                    aria-label="Product pagination"
                  >
                    {/* =================================================
                        PREVIOUS
                        ================================================= */}

                    <button
                      type="button"
                      onClick={
                        goToPreviousPage
                      }
                      disabled={
                        safeCurrentPage ===
                        1
                      }
                      aria-label="Previous page"
                      className="rounded-md border border-blue bg-white px-4 py-2 text-sm font-medium text-blue transition-all duration-200 hover:border-orange hover:bg-orange hover:text-white disabled:cursor-not-allowed disabled:border-gray-3 disabled:bg-gray-2 disabled:text-gray-5 disabled:opacity-100"
                    >
                      Prev
                    </button>

                    {/* =================================================
                        PAGE NUMBERS
                        ================================================= */}

                    <div
                      className="flex items-center gap-2"
                      aria-label="Pages"
                    >
                      {Array.from(
                        {
                          length:
                            totalPages,
                        },
                        (_, index) =>
                          index + 1,
                      ).map(
                        (page) => {
                          const isCurrent =
                            page ===
                            safeCurrentPage;

                          return (
                            <button
                              key={page}
                              type="button"
                              onClick={() =>
                                setCurrentPage(
                                  page,
                                )
                              }
                              aria-current={
                                isCurrent
                                  ? "page"
                                  : undefined
                              }
                              aria-label={`Go to page ${page}`}
                              className={
                                isCurrent
                                  ? "min-w-10 rounded-md border border-orange bg-orange px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200"
                                  : "min-w-10 rounded-md border border-blue bg-white px-3 py-2 text-sm font-medium text-blue transition-all duration-200 hover:border-orange hover:bg-orange hover:text-white"
                              }
                            >
                              {page}
                            </button>
                          );
                        },
                      )}
                    </div>

                    {/* =================================================
                        NEXT
                        ================================================= */}

                    <button
                      type="button"
                      onClick={
                        goToNextPage
                      }
                      disabled={
                        safeCurrentPage ===
                        totalPages
                      }
                      aria-label="Next page"
                      className="rounded-md border border-blue bg-white px-4 py-2 text-sm font-medium text-blue transition-all duration-200 hover:border-orange hover:bg-orange hover:text-white disabled:cursor-not-allowed disabled:border-gray-3 disabled:bg-gray-2 disabled:text-gray-5"
                    >
                      Next
                    </button>
                  </nav>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}