"use client";

import React, { useMemo } from "react";
import Link from "next/link";

import ProductItem from "@/components/Common/ProductItem";
import { useProducts } from "@/features/products/hooks/use-products";

const NewArrival = () => {
  const {
    data,
    isLoading,
    isError,
  } = useProducts();

  const products = data?.products ?? [];

  /*
   * =========================================================
   * NEW ARRIVALS
   * =========================================================
   *
   * Products come directly from the API.
   *
   * We use the first four products returned by the API
   * for the New Arrivals section.
   *
   * No static product data is used here.
   */
  const newArrivals = useMemo(() => {
    return products.slice(0, 4);
  }, [products]);

  /*
   * =========================================================
   * LOADING STATE
   * =========================================================
   */

  if (isLoading) {
    return (
      <section className="overflow-hidden pt-15">
        <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">

          {/* Section title skeleton */}
          <div className="mb-7 flex items-center justify-between">
            <div>
              <div className="h-5 w-28 animate-pulse rounded bg-gray-2" />

              <div className="mt-2 h-8 w-48 animate-pulse rounded bg-gray-2" />
            </div>

            <div className="h-10 w-28 animate-pulse rounded-md bg-gray-2" />
          </div>

          {/* Products skeleton */}
          <div className="grid grid-cols-1 gap-x-7.5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map(
              (_, index) => (
                <div key={index}>
                  <div className="h-[245px] animate-pulse rounded-lg bg-gray-1" />

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

  /*
   * =========================================================
   * API ERROR
   * =========================================================
   */

  if (isError) {
    return (
      <section className="overflow-hidden pt-15">
        <div className="mx-auto flex min-h-[250px] w-full max-w-[1170px] items-center justify-center px-4 sm:px-8 xl:px-0">
          <div
            className="text-center"
            role="alert"
          >
            <h2 className="text-xl font-semibold text-dark">
              Unable to load new arrivals
            </h2>

            <p className="mt-2 text-sm text-dark-4">
              Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  /*
   * =========================================================
   * EMPTY STATE
   * =========================================================
   */

  if (newArrivals.length === 0) {
    return null;
  }

  return (
    <section className="overflow-hidden pt-15">
      <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">

        {/* =====================================================
            SECTION HEADER
            ===================================================== */}

        <div className="mb-7 flex items-center justify-between">
          <div>
            <span className="mb-1.5 flex items-center gap-2.5 font-medium text-dark">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M3.11826 15.4622C4.11794 16.6668 5.97853 16.6668 9.69971 16.6668H10.3007C14.0219 16.6668 15.8825 16.6668 16.8821 15.4622M3.11826 15.4622C2.11857 14.2577 2.46146 12.429 3.14723 8.77153C3.63491 6.17055 3.87875 4.87006 4.8045 4.10175M3.11826 15.4622C3.11826 15.4622 3.11826 15.4622 3.11826 15.4622ZM16.8821 15.4622C17.8818 14.2577 17.5389 12.429 16.8532 8.77153C16.3655 6.17055 16.1216 4.87006 15.1959 4.10175M16.8821 15.4622C16.8821 15.4622 16.8821 15.4622 16.8821 15.4622ZM15.1959 4.10175C14.2701 3.33345 12.947 3.33345 10.3007 3.33345H9.69971C7.0534 3.33345 5.73025 3.33345 4.8045 4.10175M15.1959 4.10175C15.1959 4.10175 15.1959 4.10175 15.1959 4.10175ZM4.8045 4.10175C4.8045 4.10175 4.8045 4.10175 4.8045 4.10175Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />

                <path
                  d="M7.64258 6.66678C7.98578 7.63778 8.91181 8.33345 10.0003 8.33345C11.0888 8.33345 12.0149 7.63778 12.3581 6.66678"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>

              This Week’s
            </span>

            <h2 className="font-semibold text-xl text-dark xl:text-heading-5">
              New Arrivals
            </h2>
          </div>

          
        </div>

        {/* =====================================================
            PRODUCTS
            ===================================================== */}

        <div className="grid grid-cols-1 gap-x-7.5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

         {newArrivals.map((product) => (
  <ProductItem
    key={product.id}
    item={product}
  />
))}

        </div>
      </div>
    </section>
  );
};

export default NewArrival;