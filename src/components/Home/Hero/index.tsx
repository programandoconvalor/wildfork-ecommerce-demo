"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import HeroFeature from "./HeroFeature";
import { useProducts } from "@/features/products/hooks/use-products";

const Hero = () => {
  const {
    data,
    isLoading,
    isError,
  } = useProducts();

  const products = data?.products ?? [];

  const heroProduct = products[0];
  const secondaryProducts = products.slice(1, 3);

  /*
   * =========================================================
   * LOADING STATE
   * =========================================================
   */
  if (isLoading) {
    return (
      <section className="overflow-hidden bg-[#E5EAF4] pb-10 pt-6 sm:pb-12.5 sm:pt-8 lg:pb-12.5 lg:pt-10 xl:pb-15 xl:pt-10">
        <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <div className="grid gap-5 xl:grid-cols-[757px_393px]">
            <div className="h-[420px] animate-pulse rounded-[10px] bg-white" />

            <div className="flex flex-col gap-5">
              <div className="h-[200px] animate-pulse rounded-[10px] bg-white" />

              <div className="h-[200px] animate-pulse rounded-[10px] bg-white" />
            </div>
          </div>
        </div>

        <HeroFeature />
      </section>
    );
  }

  /*
   * =========================================================
   * API ERROR STATE
   * =========================================================
   */
  if (isError) {
    return (
      <section className="overflow-hidden bg-[#E5EAF4] pb-10 pt-6 sm:pb-12.5 sm:pt-8 lg:pb-12.5 lg:pt-10 xl:pb-15 xl:pt-10">
        <div className="mx-auto flex min-h-[420px] w-full max-w-[1170px] items-center justify-center px-4 sm:px-8 xl:px-0">
          <div
            className="rounded-[10px] bg-white px-6 py-10 text-center"
            role="alert"
          >
            <h2 className="text-xl font-semibold text-dark">
              Unable to load products
            </h2>

            <p className="mt-2 text-sm text-dark-4">
              Please try again later.
            </p>
          </div>
        </div>

        <HeroFeature />
      </section>
    );
  }

  /*
   * =========================================================
   * EMPTY API RESPONSE
   * =========================================================
   */
  if (!heroProduct) {
    return (
      <section className="overflow-hidden bg-[#E5EAF4] pb-10 pt-6 sm:pb-12.5 sm:pt-8 lg:pb-12.5 lg:pt-10 xl:pb-15 xl:pt-10">
        <div className="mx-auto flex min-h-[420px] w-full max-w-[1170px] items-center justify-center px-4 sm:px-8 xl:px-0">
          <div className="rounded-[10px] bg-white px-6 py-10 text-center">
            <h2 className="text-xl font-semibold text-dark">
              No products available
            </h2>

            <p className="mt-2 text-sm text-dark-4">
              There are currently no products to display.
            </p>
          </div>
        </div>

        <HeroFeature />
      </section>
    );
  }

  return (
    <section className="overflow-hidden bg-[#E5EAF4] pb-10 pt-6 sm:pb-12.5 sm:pt-8 lg:pb-12.5 lg:pt-10 xl:pb-15 xl:pt-10">
      <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="grid gap-5 xl:grid-cols-[757px_393px]">

          {/* =====================================================
              MAIN PRODUCT
              ===================================================== */}
          <div className="w-full">
            <article className="relative z-1 h-full min-h-[420px] overflow-hidden rounded-[10px] bg-white">

              {/* =================================================
                  DECORATIVE BACKGROUND

                  This is intentionally rendered as a CSS
                  background instead of next/image because it is
                  decorative and must not be treated as the
                  Largest Contentful Paint image.
                  ================================================= */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 right-0 -z-1 h-[520px] w-[534px] bg-contain bg-bottom-right bg-no-repeat"
                style={{
                  backgroundImage:
                    "url('/images/hero/hero-bg.png')",
                }}
              />

              <div className="flex min-h-[420px] flex-col justify-between gap-8 p-6 sm:p-10 lg:flex-row lg:items-center lg:p-12">

                {/* =================================================
                    PRODUCT INFORMATION
                    ================================================= */}
                <div className="relative z-10 max-w-[430px]">

                  <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wide text-dark-4">
                    {heroProduct.category}
                  </span>

                  {/* Product title */}
                  <Link
                    href={`/products/${heroProduct.id}`}
                    className="block transition-opacity hover:opacity-80"
                  >
                    <h1 className="max-w-[430px] text-3xl font-semibold leading-tight text-dark sm:text-4xl">
                      {heroProduct.title}
                    </h1>
                  </Link>

                  <p className="mt-4 max-w-[420px] line-clamp-3 text-base leading-7 text-dark-4">
                    {heroProduct.description}
                  </p>

                  <div className="mt-6 flex items-center gap-4">
                    <span className="text-3xl font-semibold text-red">
                      ${heroProduct.price.toFixed(2)}
                    </span>

                    <span className="text-sm text-dark-4">
                      {heroProduct.stock > 0
                        ? "In stock"
                        : "Out of stock"}
                    </span>
                  </div>

                  {/* Product detail */}
                  <Link
                    href={`/products/${heroProduct.id}`}
                    className="mt-7 inline-flex rounded-md bg-dark px-7 py-3 text-sm font-medium text-white transition hover:opacity-90"
                  >
                    View Product
                  </Link>
                </div>

                {/* =================================================
                    MAIN PRODUCT IMAGE
                    ================================================= */}
                <div className="relative flex min-h-[250px] flex-1 items-center justify-center lg:min-h-[330px]">
                  <Image
                    src={heroProduct.thumbnail}
                    alt={heroProduct.title}
                    width={380}
                    height={380}
                    sizes="(max-width: 1023px) 100vw, 380px"
                    className="h-auto max-h-[330px] w-auto max-w-full object-contain"
                    priority
                  />
                </div>
              </div>
            </article>
          </div>

          {/* =====================================================
              SECONDARY PRODUCTS
              ===================================================== */}
          <div className="w-full">
            <div className="flex flex-col gap-5 sm:flex-row xl:flex-col">

              {secondaryProducts.map((product) => (
                <article
                  key={product.id}
                  className="relative w-full overflow-hidden rounded-[10px] bg-white p-5 sm:p-7.5"
                >
                  <div className="flex min-h-[180px] items-center justify-between gap-5">

                    {/* Product information */}
                    <div className="min-w-0 flex-1">

                      <span className="text-xs font-medium uppercase tracking-wide text-dark-4">
                        {product.category}
                      </span>

                      {/* Product title */}
                      <Link
                        href={`/products/${product.id}`}
                        className="block transition-opacity hover:opacity-80"
                      >
                        <h2 className="mt-2 line-clamp-2 text-xl font-semibold leading-tight text-dark">
                          {product.title}
                        </h2>
                      </Link>

                      <div className="mt-6">
                        <span className="text-2xl font-medium text-red">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-dark-4">
                        {product.stock > 0
                          ? "In stock"
                          : "Out of stock"}
                      </p>
                    </div>

                    {/* Product image */}
                    <div className="flex w-[120px] shrink-0 items-center justify-center sm:w-[135px]">
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        width={150}
                        height={150}
                        sizes="150px"
                        className="h-auto max-h-[150px] w-auto max-w-full object-contain"
                      />
                    </div>
                  </div>
                </article>
              ))}

              {/* If the API only returns one product */}
              {secondaryProducts.length === 0 && (
                <div className="flex min-h-[180px] items-center justify-center rounded-[10px] bg-white p-6 text-center">
                  <p className="text-sm text-dark-4">
                    More products will appear here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          HERO FEATURES
          ========================================================= */}
      <HeroFeature />
    </section>
  );
};

export default Hero;