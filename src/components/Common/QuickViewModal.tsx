"use client";

import React, {
  useEffect,
  useState,
} from "react";

import Image from "next/image";
import { useDispatch } from "react-redux";

import {
  useModalContext,
} from "@/app/context/QuickViewModalContext";

import {
  usePreviewSlider,
} from "@/app/context/PreviewSliderContext";

import {
  AppDispatch,
  useAppSelector,
} from "@/redux/store";

import {
  addItem,
} from "@/features/cart/store/cart.slice";

import {
  resetQuickView,
} from "@/redux/features/quickView-slice";

import {
  updateproductDetails,
} from "@/redux/features/product-details";

const QuickViewModal = () => {
  const {
    isModalOpen,
    closeModal,
  } = useModalContext();

  const {
    openPreviewModal,
  } = usePreviewSlider();

  const [quantity, setQuantity] =
    useState(1);

  const dispatch =
    useDispatch<AppDispatch>();

  /*
   * =========================================================
   * PRODUCT
   * =========================================================
   *
   * Retrieves the product currently stored in the
   * Quick View Redux state.
   */
  const product = useAppSelector(
    (state) => state.quickView.value,
  );

  const [activePreview, setActivePreview] =
    useState(0);

  /*
   * =========================================================
   * DERIVED PRODUCT DATA
   * =========================================================
   *
   * The canonical Product model uses:
   *
   * - thumbnail
   * - images
   * - price
   * - discountPercentage
   *
   * Legacy `imgs` and `discountedPrice` properties are
   * intentionally not read from Product anymore.
   *
   * Image URLs are normalized and empty values are removed
   * before they reach next/image.
   */

  const productImages = [
    ...(Array.isArray(product.images)
      ? product.images
      : []),

    ...(product.thumbnail
      ? [product.thumbnail]
      : []),
  ].filter(
    (image): image is string =>
      typeof image === "string" &&
      image.trim().length > 0,
  );

  /*
   * Remove duplicate image URLs while preserving order.
   */
  const uniqueProductImages = [
    ...new Set(productImages),
  ];

  const thumbnails =
    uniqueProductImages;

  const previews =
    uniqueProductImages;

  const discountedPrice =
    product.discountPercentage > 0
      ? product.price -
        (product.price *
          product.discountPercentage) /
          100
      : product.price;

  const hasDiscount =
    product.discountPercentage > 0 &&
    discountedPrice < product.price;

  const isInStock =
    product.stock > 0;

  /*
   * Keep activePreview inside the valid range
   * whenever the product image collection changes.
   */
  useEffect(() => {
    if (
      uniqueProductImages.length === 0
    ) {
      setActivePreview(0);
      return;
    }

    setActivePreview((current) =>
      Math.min(
        current,
        uniqueProductImages.length - 1,
      ),
    );
  }, [
    product.id,
    productImages.length,
    uniqueProductImages.length,
  ]);

  /*
   * =========================================================
   * PREVIEW SLIDER
   * =========================================================
   *
   * Stores the selected product in the product-details
   * Redux state and opens the image preview modal.
   */
  const handlePreviewSlider = () => {
    if (
      uniqueProductImages.length === 0
    ) {
      return;
    }

    dispatch(
      updateproductDetails(product),
    );

    openPreviewModal();
  };

  /*
   * =========================================================
   * ADD TO CART
   * =========================================================
   *
   * Uses the current cart action and keeps the quantity
   * controlled by the Quick View component.
   */
  const handleAddToCart = () => {
    if (
      product.stock <= 0 ||
      quantity <= 0
    ) {
      return;
    }

    dispatch(
      addItem({
        ...product,
        quantity,
        discountedPrice,
      }),
    );

    closeModal();
  };

  /*
   * =========================================================
   * MODAL LIFECYCLE
   * =========================================================
   *
   * Closes the modal when the user clicks outside
   * the modal content and resets the quantity when
   * the modal closes.
   */
  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent,
    ) => {
      const target =
        event.target as HTMLElement | null;

      if (
        target &&
        !target.closest(
          ".modal-content",
        )
      ) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener(
        "mousedown",
        handleClickOutside,
      );
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );

      setQuantity(1);
      setActivePreview(0);

      dispatch(resetQuickView());
    };
  }, [
    isModalOpen,
    closeModal,
    dispatch,
  ]);

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */
  return (
    <div
      className={`
        ${
          isModalOpen
            ? "z-99999"
            : "hidden"
        }
        fixed
        left-0
        top-0
        h-screen
        w-full
        overflow-y-auto
        bg-dark/70
        px-4
        py-5
        no-scrollbar
        sm:px-8
        sm:py-20
        xl:py-25
        2xl:py-[230px]
      `}
    >
      <div className="flex items-center justify-center">
        <div
          className="
            modal-content
            relative
            w-full
            max-w-[1100px]
            rounded-xl
            bg-white
            p-7.5
            shadow-3
          "
        >
          {/* =================================================
              CLOSE BUTTON
              ================================================= */}
          <button
            type="button"
            onClick={closeModal}
            aria-label="Close product preview"
            className="
              absolute
              right-0
              top-0
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-meta
              text-body
              transition-colors
              duration-150
              ease-in
              hover:text-dark
              sm:right-6
              sm:top-6
            "
          >
            <svg
              className="fill-current"
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.3108 13L19.2291 8.08167C19.5866 7.72417 19.5866 7.12833 19.2291 6.77083C19.0543 6.59895 18.8189 6.50262 18.5737 6.50262C18.3285 6.50262 18.0932 6.59895 17.9183 6.77083L13 11.6892L8.08164 6.77083C7.90679 6.59895 7.67142 6.50262 7.42623 6.50262C7.18104 6.50262 6.94566 6.59895 6.77081 6.77083C6.41331 7.12833 6.41331 7.72417 6.77081 8.08167L11.6891 13L6.77081 17.9183C6.41331 18.2758 6.41331 18.8717 6.77081 19.2292C7.12831 19.5867 7.72414 19.5867 8.08164 19.2292L13 14.3108L17.9183 19.2292C18.2758 19.5867 18.8716 19.5867 19.2291 19.2292C19.5866 18.8717 19.5866 18.2758 19.2291 17.9183L14.3108 13Z"
              />
            </svg>
          </button>

          <div className="flex flex-wrap items-center gap-12.5">
            {/* =================================================
                PRODUCT GALLERY
                ================================================= */}
            <div className="w-full max-w-[526px]">
              <div className="flex gap-5">
                {/* Thumbnails */}
                <div className="flex flex-col gap-5">
                  {thumbnails.map(
                    (img, index) => (
                      <button
                        type="button"
                        key={`${img}-${index}`}
                        onClick={() =>
                          setActivePreview(
                            index,
                          )
                        }
                        aria-label={`View product image ${
                          index + 1
                        }`}
                        className={`
                          flex
                          h-20
                          w-20
                          items-center
                          justify-center
                          overflow-hidden
                          rounded-lg
                          bg-gray-1
                          transition-all
                          duration-200
                          hover:border-2
                          hover:border-blue
                          ${
                            activePreview ===
                            index
                              ? "border-2 border-blue"
                              : ""
                          }
                        `}
                      >
                        <Image
                          src={img}
                          alt={`${product.title} thumbnail ${
                            index + 1
                          }`}
                          width={61}
                          height={61}
                          className="aspect-square"
                        />
                      </button>
                    ),
                  )}
                </div>

                {/* Main image */}
                <div
                  className="
                    relative
                    z-1
                    flex
                    min-h-[508px]
                    w-full
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-lg
                    border
                    border-gray-3
                    bg-gray-1
                  "
                >
                  <div className="relative">
                    {/* Zoom */}
                    {previews.length > 0 && (
                      <button
                        type="button"
                        onClick={
                          handlePreviewSlider
                        }
                        aria-label="Zoom product image"
                        className="
                          gallery__Image
                          absolute
                          right-4
                          top-4
                          z-50
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-[5px]
                          bg-white
                          text-dark
                          shadow-1
                          transition-colors
                          duration-200
                          ease-out
                          hover:text-blue
                          lg:right-8
                          lg:top-8
                        "
                      >
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.11493 1.14581L9.16665 1.14581C9.54634 1.14581 9.85415 1.45362 9.85415 1.83331C9.85415 2.21301 9.54634 2.52081 9.16665 2.52081C7.41873 2.52081 6.17695 2.52227 5.23492 2.64893C4.31268 2.77292 3.78133 3.00545 3.39339 3.39339C3.00545 3.78133 2.77292 4.31268 2.64893 5.23492C2.52227 6.17695 2.52081 7.41873 2.52081 9.16665C2.52081 9.54634 2.21301 9.85415 1.83331 9.85415C1.45362 9.85415 1.14581 9.54634 1.14581 9.16665L1.14581 9.11493C1.1458 7.43032 1.14579 6.09599 1.28619 5.05171C1.43068 3.97699 1.73512 3.10712 2.42112 2.42112C3.10712 1.73512 3.97699 1.43068 5.05171 1.28619C6.09599 1.14579 7.43032 1.1458 9.11493 1.14581ZM16.765 2.64893C15.823 2.52227 14.5812 2.52081 12.8333 2.52081C12.4536 2.52081 12.1458 1.45362 12.1458 1.83331C12.1458 2.21301 12.4536 2.52081 12.8333 2.52081L12.885 2.52081C14.5696 2.5208 15.904 2.52079 16.9483 2.66119C18.023 2.80568 18.8928 3.11012 19.5788 3.79612C20.2648 4.48212 20.5693 5.35199 20.7138 6.42671C20.8542 7.47099 20.8542 8.80532 20.8541 10.4899V10.5417C20.8541 10.9213 20.5463 11.2291 20.1666 11.2291C19.787 11.2291 19.4791 10.9213 19.4791 10.5417C19.4791 8.79373 19.4777 7.55195 19.351 6.60992C19.227 5.68768 18.9945 5.15683 18.6066 4.76889C18.2186 4.38095 17.6873 4.14812 16.765 4.02143C15.823 3.89477 14.5812 3.89331 12.8333 3.89331C12.4536 3.89331 12.1458 3.58551 12.1458 3.20581C12.1458 2.82612 12.4536 2.51831 12.8333 2.51831C14.5812 2.51831 15.823 2.51977 16.765 2.64893Z"
                          />
                        </svg>
                      </button>
                    )}

                    {/* Main product image */}
                    {previews.length > 0 &&
                      previews[
                        activePreview
                      ] && (
                        <Image
                          src={
                            previews[
                              activePreview
                            ]
                          }
                          alt={`${product.title} product image`}
                          width={400}
                          height={400}
                          className="object-contain"
                        />
                      )}

                    {/* Empty image state */}
                    {previews.length === 0 && (
                      <div
                        className="
                          flex
                          min-h-[400px]
                          w-full
                          min-w-[300px]
                          items-center
                          justify-center
                          text-center
                          text-sm
                          text-dark-4
                        "
                        role="img"
                        aria-label="Product image unavailable"
                      >
                        Image unavailable
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                PRODUCT INFORMATION
                ================================================= */}
            <div className="w-full max-w-[445px]">
              <span className="mb-6.5 inline-block bg-green px-3 py-1 text-custom-xs font-medium text-white">
                {product.discountPercentage > 0
                  ? `SALE ${product.discountPercentage}% OFF`
                  : "PRODUCT"}
              </span>

              <h3 className="mb-4 text-xl font-semibold text-dark xl:text-heading-5">
                {product.title}
              </h3>

              {/* Rating */}
              <div className="mb-6 flex flex-wrap items-center gap-5">
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-1">
                    {[0, 1, 2, 3, 4].map(
                      (star) => (
                        <svg
                          key={star}
                          className={
                            star <
                            Math.round(
                              product.rating ??
                                0,
                            )
                              ? "fill-[#FFA645]"
                              : "fill-gray-4"
                          }
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M16.7906 6.72187L11.7 5.93438L9.39377 1.09688C9.22502 0.759375 8.77502 0.759375 8.60627 1.09688L6.30002 5.9625L1.23752 6.72187C0.871891 6.77812 0.731266 7.25625 1.01252 7.50938L4.69689 11.3063L3.82502 16.6219C3.76877 16.9875 4.13439 17.2969 4.47189 17.0719L9.05627 14.5687L13.6125 17.0719C13.9219 17.2406 14.3156 16.9594 14.2313 16.6219L13.3594 11.3063L17.0438 7.50938C17.2688 7.25625 17.1563 6.77812 16.7906 6.72187Z"
                          />
                        </svg>
                      ),
                    )}
                  </div>

                  <span>
                    <span className="font-medium text-dark">
                      {(
                        product.rating ??
                        0
                      ).toFixed(1)}{" "}
                      Rating
                    </span>

                    <span className="text-dark-2">
                      {" "}
                      (
                      {product.reviews
                        ?.length ?? 0}{" "}
                      reviews)
                    </span>
                  </span>
                </div>

                {/* Stock */}
                <div className="flex items-center gap-2">
                  <span
                    className={
                      isInStock
                        ? "font-medium text-dark"
                        : "font-medium text-red"
                    }
                  >
                    {isInStock
                      ? "In Stock"
                      : "Out of Stock"}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-dark-4">
                {product.description}
              </p>

              {/* Price + Quantity */}
              <div className="mb-7.5 mt-6 flex flex-wrap justify-between gap-5">
                <div>
                  <h4 className="mb-3.5 text-lg font-semibold text-dark">
                    Price
                  </h4>

                  <span className="flex items-center gap-2">
                    <span className="text-xl font-semibold text-dark xl:text-heading-4">
                      $
                      {discountedPrice.toFixed(
                        2,
                      )}
                    </span>

                    {hasDiscount && (
                      <span className="text-lg font-medium text-dark-4 line-through xl:text-2xl">
                        $
                        {product.price.toFixed(
                          2,
                        )}
                      </span>
                    )}
                  </span>
                </div>

                <div>
                  <h4 className="mb-3.5 text-lg font-semibold text-dark">
                    Quantity
                  </h4>

                  <div className="flex items-center gap-3">
                    {/* Decrease */}
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity(
                          (current) =>
                            Math.max(
                              1,
                              current - 1,
                            ),
                        )
                      }
                      disabled={
                        quantity <= 1
                      }
                      aria-label="Decrease product quantity"
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-[5px]
                        bg-gray-2
                        text-dark
                        transition-colors
                        duration-200
                        ease-out
                        hover:text-blue
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                      "
                    >
                      <span aria-hidden="true">
                        −
                      </span>
                    </button>

                    {/* Quantity */}
                    <span
                      className="
                        flex
                        h-10
                        w-20
                        items-center
                        justify-center
                        rounded-[5px]
                        border
                        border-gray-4
                        bg-white
                        font-medium
                        text-dark
                      "
                      aria-label={`Quantity ${quantity}`}
                    >
                      {quantity}
                    </span>

                    {/* Increase */}
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity(
                          (current) =>
                            Math.min(
                              isInStock
                                ? product.stock
                                : 1,
                              current + 1,
                            ),
                        )
                      }
                      disabled={
                        !isInStock ||
                        quantity >=
                          product.stock
                      }
                      aria-label="Increase product quantity"
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-[5px]
                        bg-gray-2
                        text-dark
                        transition-colors
                        duration-200
                        ease-out
                        hover:text-blue
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                      "
                    >
                      <span aria-hidden="true">
                        +
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  disabled={!isInStock}
                  onClick={
                    handleAddToCart
                  }
                  className="
                    inline-flex
                    rounded-md
                    bg-blue
                    px-7
                    py-3
                    font-medium
                    text-white
                    transition-all
                    duration-200
                    ease-out
                    hover:bg-blue-dark
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue
                    focus:ring-offset-2
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {isInStock
                    ? "Add to Cart"
                    : "Out of Stock"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;