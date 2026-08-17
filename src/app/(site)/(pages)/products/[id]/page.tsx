"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { useProducts } from "@/features/products/hooks/use-products";
import { addItem } from "@/features/cart/store/cart.slice";

/**
 * =========================================================
 * PRODUCT DETAIL PAGE
 * =========================================================
 *
 * This page displays a single product using the product ID
 * received from the dynamic route:
 *
 * /products/1
 * /products/16
 * /products/30
 *
 * Product information comes exclusively from the API.
 *
 * We intentionally do not use static product data here.
 */
export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    data,
    isLoading,
    isError,
  } = useProducts();

  /**
   * =========================================================
   * PRODUCT ID
   * =========================================================
   *
   * Next.js dynamic routes can return the parameter as
   * string or string[].
   */
  const productId = useMemo(() => {
    const value = params?.id;

    if (Array.isArray(value)) {
      return Number(value[0]);
    }

    return Number(value);
  }, [params]);

  /**
   * =========================================================
   * FIND PRODUCT
   * =========================================================
   *
   * The product is obtained from the products already loaded
   * through React Query.
   */
  const product = useMemo(() => {
    const products = data?.products ?? [];

    return products.find(
      (item) => Number(item.id) === productId,
    );
  }, [data?.products, productId]);

  /**
   * =========================================================
   * IMAGE GALLERY
   * =========================================================
   *
   * The API provides:
   *
   * - thumbnail
   * - images[]
   *
   * We combine them while removing duplicated URLs.
   */
  const galleryImages = useMemo(() => {
    if (!product) {
      return [];
    }

    const images = [
      product.thumbnail,
      ...(product.images ?? []),
    ].filter(Boolean);

    return Array.from(new Set(images));
  }, [product]);

  /**
   * =========================================================
   * SELECTED IMAGE
   * =========================================================
   */
  const [selectedImage, setSelectedImage] = useState<
    string | null
  >(null);

  /**
   * Use the first API image as the default image.
   */
  const activeImage =
    selectedImage ??
    galleryImages[0] ??
    null;

  /**
   * =========================================================
   * QUANTITY
   * =========================================================
   */
  const [quantity, setQuantity] = useState(1);

  /**
   * =========================================================
   * ADD TO CART
   * =========================================================
   */
  const handleAddToCart = () => {
    if (!product || product.stock <= 0) {
      return;
    }

    dispatch(
      addItem({
        ...product,
        quantity,
      }),
    );
  };

  /**
   * =========================================================
   * PURCHASE NOW
   * =========================================================
   *
   * Adds the selected quantity to the cart and redirects
   * the customer to the cart page.
   */
  const handlePurchaseNow = () => {
    if (!product || product.stock <= 0) {
      return;
    }

    dispatch(
      addItem({
        ...product,
        quantity,
      }),
    );

    router.push("/cart");
  };

  /**
   * =========================================================
   * LOADING STATE
   * =========================================================
   */
  if (isLoading) {
    return (
      <main className="bg-white">
        <div className="mx-auto w-full max-w-[1170px] px-4 py-12 sm:px-8 xl:px-0">

          <div className="grid gap-10 lg:grid-cols-2">

            {/* Image skeleton */}
            <div>
              <div className="aspect-square animate-pulse rounded-2xl bg-gray-1" />

              <div className="mt-5 flex gap-4">
                <div className="h-20 w-20 animate-pulse rounded-lg bg-gray-1" />
                <div className="h-20 w-20 animate-pulse rounded-lg bg-gray-1" />
                <div className="h-20 w-20 animate-pulse rounded-lg bg-gray-1" />
              </div>
            </div>

            {/* Product information skeleton */}
            <div className="space-y-6 py-4">

              <div className="h-4 w-24 animate-pulse rounded bg-gray-1" />

              <div className="h-10 w-4/5 animate-pulse rounded bg-gray-1" />

              <div className="h-6 w-40 animate-pulse rounded bg-gray-1" />

              <div className="h-8 w-28 animate-pulse rounded bg-gray-1" />

              <div className="space-y-3">
                <div className="h-4 w-full animate-pulse rounded bg-gray-1" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-gray-1" />
                <div className="h-4 w-4/6 animate-pulse rounded bg-gray-1" />
              </div>

              <div className="h-12 w-full animate-pulse rounded-md bg-gray-1" />

              <div className="h-12 w-full animate-pulse rounded-md bg-gray-1" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  /**
   * =========================================================
   * API ERROR
   * =========================================================
   */
  if (isError) {
    return (
      <main className="bg-white">
        <div className="mx-auto flex min-h-[500px] w-full max-w-[1170px] items-center justify-center px-4 sm:px-8 xl:px-0">

          <div
            className="max-w-md text-center"
            role="alert"
          >
            <h1 className="text-2xl font-semibold text-dark">
              Unable to load product
            </h1>

            <p className="mt-3 text-sm text-dark-4">
              We couldn't load the product information.
              Please try again later.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex items-center justify-center rounded-md bg-dark px-7 py-3 text-sm font-medium text-white transition hover:bg-brand"
            >
              Back to products
            </Link>
          </div>

        </div>
      </main>
    );
  }

  /**
   * =========================================================
   * PRODUCT NOT FOUND
   * =========================================================
   */
  if (!product) {
    return (
      <main className="bg-white">
        <div className="mx-auto flex min-h-[500px] w-full max-w-[1170px] items-center justify-center px-4 sm:px-8 xl:px-0">

          <div className="max-w-md text-center">

            <span className="text-sm font-medium uppercase tracking-wide text-dark-4">
              Product
            </span>

            <h1 className="mt-2 text-2xl font-semibold text-dark">
              Product not found
            </h1>

            <p className="mt-3 text-sm text-dark-4">
              The product you are looking for is not available.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex items-center justify-center rounded-md bg-dark px-7 py-3 text-sm font-medium text-white transition hover:bg-brand"
            >
              Browse products
            </Link>

          </div>

        </div>
      </main>
    );
  }

  /**
   * =========================================================
   * PRODUCT STATE
   * =========================================================
   */
  const isInStock = product.stock > 0;

  const maxQuantity = Math.max(
    1,
    product.stock,
  );

  /**
   * Keep quantity within available stock.
   */
  const decreaseQuantity = () => {
    setQuantity((current) =>
      Math.max(1, current - 1),
    );
  };

  const increaseQuantity = () => {
    setQuantity((current) =>
      Math.min(maxQuantity, current + 1),
    );
  };

  return (
    <main className="overflow-hidden bg-white">

      {/* =====================================================
          BREADCRUMB
          ===================================================== */}

      <div className="border-b border-gray-3 bg-gray-1">
        <div className="mx-auto w-full max-w-[1170px] px-4 py-4 sm:px-8 xl:px-0">

          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm"
          >
            <Link
              href="/"
              className="text-dark-4 transition hover:text-brand"
            >
              Home
            </Link>

            <span className="text-dark-4">
              /
            </span>

            <Link
              href="/products"
              className="text-dark-4 transition hover:text-brand"
            >
              Products
            </Link>

            <span className="text-dark-4">
              /
            </span>

            <span className="truncate font-medium text-dark">
              {product.title}
            </span>
          </nav>

        </div>
      </div>

      {/* =====================================================
          PRODUCT DETAIL
          ===================================================== */}

      <section className="py-10 sm:py-14 lg:py-16">
        <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">

          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14 xl:gap-20">

            {/* =================================================
                PRODUCT GALLERY
                ================================================= */}

            <div>

              {/* Main image */}
              <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-[#F6F7FB]">

                {activeImage ? (
                  <Image
                    src={activeImage}
                    alt={product.title}
                    fill
                    priority
                    className="object-contain p-8 sm:p-12"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="text-sm text-dark-4">
                    No image available
                  </div>
                )}

                {/* Stock badge */}
                <div className="absolute left-5 top-5">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                      isInStock
                        ? "bg-white text-green-600 shadow-sm"
                        : "bg-white text-red-600 shadow-sm"
                    }`}
                  >
                    <span
                      className={`mr-2 h-2 w-2 rounded-full ${
                        isInStock
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    />

                    {isInStock
                      ? "In stock"
                      : "Out of stock"}
                  </span>
                </div>
              </div>

              {/* Thumbnail gallery */}
              {galleryImages.length > 1 && (
                <div className="mt-5 flex flex-wrap gap-4">

                  {galleryImages.map(
                    (image, index) => {
                      const isSelected =
                        image === activeImage;

                      return (
                        <button
                          key={`${image}-${index}`}
                          type="button"
                          onClick={() =>
                            setSelectedImage(image)
                          }
                          aria-label={`View product image ${
                            index + 1
                          }`}
                          className={`relative h-20 w-20 overflow-hidden rounded-lg bg-[#F6F7FB] transition ${
                            isSelected
                              ? "ring-2 ring-brand ring-offset-2"
                              : "border border-transparent hover:border-gray-3"
                          }`}
                        >
                          <Image
                            src={image}
                            alt=""
                            fill
                            className="object-contain p-2"
                            sizes="80px"
                          />
                        </button>
                      );
                    },
                  )}

                </div>
              )}

            </div>

            {/* =================================================
                PRODUCT INFORMATION
                ================================================= */}

            <div className="flex flex-col justify-center">

              {/* Category */}
              <span className="mb-3 text-sm font-medium uppercase tracking-[0.12em] text-dark-4">
                {product.category}
              </span>

              {/* Product title */}
              <h1 className="max-w-2xl text-3xl font-semibold leading-tight text-dark sm:text-4xl xl:text-5xl">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="mt-5 flex flex-wrap items-center gap-3">

                <div
                  className="flex items-center gap-1"
                  aria-label="Customer reviews"
                >
                  {Array.from({
                    length: 5,
                  }).map((_, index) => (
                    <svg
                      key={index}
                      width="18"
                      height="18"
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M10 1.667L12.575 6.882L18.333 7.72L14.167 11.78L15.15 17.513L10 14.805L4.85 17.513L5.833 11.78L1.667 7.72L7.425 6.882L10 1.667Z"
                        stroke="#C5CBD6"
                        strokeWidth="1.4"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ))}
                </div>

                <span className="text-sm text-dark-4">
                  No customer reviews
                </span>

              </div>

              {/* Price */}
              <div className="mt-6 flex items-center gap-3">

                <span className="text-3xl font-semibold text-red">
                  ${product.price.toFixed(2)}
                </span>

              </div>

              {/* Divider */}
              <div className="my-7 border-t border-gray-3" />

              {/* Description */}
              <div>
                <h2 className="mb-3 text-base font-semibold text-dark">
                  Product description
                </h2>

                <p className="max-w-2xl text-base leading-7 text-dark-4">
                  {product.description}
                </p>
              </div>

              {/* Product information */}
              <div className="mt-7 space-y-3">

                <div className="flex items-center gap-3 text-sm">
                  <span className="font-medium text-dark">
                    Category:
                  </span>

                  <span className="text-dark-4">
                    {product.category}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <span className="font-medium text-dark">
                    Availability:
                  </span>

                  <span
                    className={
                      isInStock
                        ? "font-medium text-green-600"
                        : "font-medium text-red-600"
                    }
                  >
                    {isInStock
                      ? `${product.stock} available`
                      : "Out of stock"}
                  </span>
                </div>

              </div>

              {/* =================================================
                  PURCHASE AREA
                  ================================================= */}

              <div className="mt-8 border-t border-gray-3 pt-7">

                <div className="flex flex-col gap-4 sm:flex-row">

                  {/* Quantity selector */}
                  <div className="inline-flex h-12 w-fit items-center overflow-hidden rounded-md border border-gray-3">

                    <button
                      type="button"
                      onClick={decreaseQuantity}
                      disabled={
                        !isInStock ||
                        quantity <= 1
                      }
                      aria-label="Decrease quantity"
                      className="flex h-full w-12 items-center justify-center text-xl text-dark transition hover:bg-gray-1 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      −
                    </button>

                    <span className="flex h-full min-w-12 items-center justify-center border-x border-gray-3 px-3 text-sm font-medium text-dark">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={increaseQuantity}
                      disabled={
                        !isInStock ||
                        quantity >= maxQuantity
                      }
                      aria-label="Increase quantity"
                      className="flex h-full w-12 items-center justify-center text-xl text-dark transition hover:bg-gray-1 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      +
                    </button>

                  </div>

                  {/* Add to cart */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={!isInStock}
                    className="inline-flex h-12 flex-1 items-center justify-center rounded-md bg-dark px-8 text-sm font-semibold text-white transition hover:bg-brand disabled:cursor-not-allowed disabled:bg-gray-3 disabled:text-dark-4"
                  >
                    {isInStock
                      ? "Add to cart"
                      : "Out of stock"}
                  </button>

                  {/* Purchase now */}
                  <button
                    type="button"
                    onClick={handlePurchaseNow}
                    disabled={!isInStock}
                    className="inline-flex h-12 flex-1 items-center justify-center rounded-md bg-brand px-8 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-3 disabled:text-dark-4"
                  >
                    Purchase now
                  </button>

                </div>

              </div>

              {/* Benefits */}
              <div className="mt-8 grid gap-4 sm:grid-cols-3">

                <div className="rounded-lg border border-gray-3 bg-gray-1 p-4">
                  <p className="text-sm font-semibold text-dark">
                    Secure checkout
                  </p>

                  <p className="mt-1 text-xs leading-5 text-dark-4">
                    Safe and reliable shopping experience.
                  </p>
                </div>

                <div className="rounded-lg border border-gray-3 bg-gray-1 p-4">
                  <p className="text-sm font-semibold text-dark">
                    Fast delivery
                  </p>

                  <p className="mt-1 text-xs leading-5 text-dark-4">
                    Delivery information available at checkout.
                  </p>
                </div>

                <div className="rounded-lg border border-gray-3 bg-gray-1 p-4">
                  <p className="text-sm font-semibold text-dark">
                    Easy shopping
                  </p>

                  <p className="mt-1 text-xs leading-5 text-dark-4">
                    Add products to your cart in one click.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}