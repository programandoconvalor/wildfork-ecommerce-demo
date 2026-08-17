"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

import { useProducts } from "@/features/products/hooks/use-products";

const PromoBanner = () => {
  const {
    data,
    isLoading,
    isError,
  } = useProducts();

  const products = data?.products ?? [];

  /*
   * =========================================================
   * PROMO PRODUCTS
   * =========================================================
   *
   * Products come directly from the API.
   *
   * We use the first three products returned by the API:
   *
   * 0 -> Main banner
   * 1 -> Secondary banner
   * 2 -> Secondary banner
   *
   * No static product information is used.
   */

  const promoProducts = useMemo(() => {
    return products.slice(0, 3);
  }, [products]);

  const mainProduct = promoProducts[0];
  const secondaryProducts = promoProducts.slice(1, 3);

  /*
   * =========================================================
   * LOADING STATE
   * =========================================================
   */

  if (isLoading) {
    return (
      <section className="overflow-hidden py-15 sm:py-20">
        <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">

          {/* Main banner skeleton */}
          <div className="mb-7.5 h-[360px] animate-pulse rounded-lg bg-gray-1" />

          {/* Secondary banners skeleton */}
          <div className="grid grid-cols-1 gap-7.5 lg:grid-cols-2">
            <div className="h-[280px] animate-pulse rounded-lg bg-gray-1" />

            <div className="h-[280px] animate-pulse rounded-lg bg-gray-1" />
          </div>

        </div>
      </section>
    );
  }

  /*
   * =========================================================
   * ERROR STATE
   * =========================================================
   */

  if (isError) {
    return (
      <section className="overflow-hidden py-15 sm:py-20">
        <div className="mx-auto flex min-h-[300px] w-full max-w-[1170px] items-center justify-center px-4 sm:px-8 xl:px-0">
          <div
            className="text-center"
            role="alert"
          >
            <h2 className="text-xl font-semibold text-dark">
              Unable to load featured products
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

  if (!mainProduct) {
    return null;
  }

  return (
    <section className="overflow-hidden py-15 sm:py-20">
      <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">

        {/* =====================================================
            MAIN PROMO BANNER
            ===================================================== */}

        <div className="relative z-1 mb-7.5 overflow-hidden rounded-lg bg-[#F5F5F7] px-4 py-10 sm:px-7.5 lg:px-14 lg:py-14 xl:px-19 xl:py-17.5">

          {/* Decorative background */}
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-gradient-to-bl from-[#E5EAF4] via-transparent to-transparent"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-[550px]">

            {/* Category */}
            <span className="mb-3 block text-sm font-medium uppercase tracking-wide text-dark-4">
              {mainProduct.category}
            </span>

            {/* Product title */}
            <h2 className="mb-5 max-w-[500px] text-2xl font-bold leading-tight text-dark lg:text-4xl">
              {mainProduct.title}
            </h2>

            {/* Description */}
            <p className="line-clamp-3 max-w-[520px] text-base leading-7 text-dark-4">
              {mainProduct.description}
            </p>

            {/* Price / stock */}
            <div className="mt-5 flex items-center gap-4">
              <span className="text-3xl font-semibold text-red">
                ${mainProduct.price.toFixed(2)}
              </span>

              <span
                className={`text-sm font-medium ${
                  mainProduct.stock > 0
                    ? "text-dark-4"
                    : "text-red"
                }`}
              >
                {mainProduct.stock > 0
                  ? "In stock"
                  : "Out of stock"}
              </span>
            </div>

            {/* View Product */}
            <Link
              href={`/products/${mainProduct.id}`}
              className="mt-7.5 inline-flex items-center justify-center rounded-md bg-dark px-8.5 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-brand"
            >
              View Product
            </Link>
          </div>

          {/* Main product image */}
          <div className="pointer-events-none absolute bottom-0 right-5 hidden h-full w-[42%] items-end justify-center lg:flex xl:right-14">
            <Image
              src={mainProduct.thumbnail}
              alt={mainProduct.title}
              width={360}
              height={360}
              className="max-h-[320px] w-auto max-w-full object-contain"
              priority
            />
          </div>
        </div>

        {/* =====================================================
            SECONDARY PROMO PRODUCTS
            ===================================================== */}

        {secondaryProducts.length > 0 && (
          <div className="grid grid-cols-1 gap-7.5 lg:grid-cols-2">

            {secondaryProducts.map((product, index) => (
              <article
                key={product.id}
                className={`relative z-1 min-h-[280px] overflow-hidden rounded-lg px-4 py-10 sm:px-7.5 xl:px-10 ${
                  index === 0
                    ? "bg-[#E8F4F4]"
                    : "bg-[#FFF1E8]"
                }`}
              >

                {/* Product image */}
                <div className="pointer-events-none absolute left-3 top-1/2 flex h-[220px] w-[42%] -translate-y-1/2 items-center justify-center sm:left-8">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={230}
                    height={230}
                    className="max-h-[220px] w-auto max-w-full object-contain"
                  />
                </div>

                {/* Product information */}
                <div className="relative z-10 ml-auto w-[58%] text-right">

                  {/* Category */}
                  <span className="mb-1.5 block text-sm font-medium uppercase tracking-wide text-dark-4">
                    {product.category}
                  </span>

                  {/* Title */}
                  <h2 className="mb-2.5 line-clamp-2 text-xl font-bold leading-tight text-dark lg:text-2xl">
                    {product.title}
                  </h2>

                  {/* Description */}
                  <p className="ml-auto line-clamp-2 max-w-[285px] text-sm leading-6 text-dark-4">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="mt-4 flex items-center justify-end gap-3">
                    <span className="text-2xl font-semibold text-red">
                      ${product.price.toFixed(2)}
                    </span>

                    <span
                      className={`text-sm font-medium ${
                        product.stock > 0
                          ? "text-dark-4"
                          : "text-red"
                      }`}
                    >
                      {product.stock > 0
                        ? "In stock"
                        : "Out of stock"}
                    </span>
                  </div>

                  {/* View Product */}
                  <Link
                    href={`/products/${product.id}`}
                    className="mt-6 inline-flex items-center justify-center rounded-md bg-dark px-7 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-brand"
                  >
                    View Product
                  </Link>
                </div>
              </article>
            ))}

          </div>
        )}

      </div>
    </section>
  );
};

export default PromoBanner;