"use client";

import React, { useEffect } from "react";

import Link from "next/link";

import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import { selectTotalPrice } from "@/features/cart/store/cart.slice";
import { useAppSelector } from "@/redux/store";
import { useSelector } from "react-redux";

import SingleItem from "./SingleItem";
import EmptyCart from "./EmptyCart";

/**
 * CartSidebarModal
 *
 * Slide-in shopping cart drawer used from the
 * global header cart action.
 *
 * Responsibilities:
 * - Opens/closes the cart drawer.
 * - Displays current cart items.
 * - Displays subtotal.
 * - Provides View Cart and Checkout actions.
 * - Closes when clicking outside the drawer.
 */
const CartSidebarModal = () => {
  const {
    isCartModalOpen,
    closeCartModal,
  } = useCartModalContext();

  const cartItems = useAppSelector(
    (state) => state.cart.items,
  );

  const totalPrice = useSelector(
    selectTotalPrice,
  );

  /**
   * =========================================================
   * CLOSE WHEN CLICKING OUTSIDE THE DRAWER
   * =========================================================
   */

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent,
    ) => {
      const target =
        event.target as HTMLElement;

      if (
        !target.closest(
          ".modal-content",
        )
      ) {
        closeCartModal();
      }
    };

    if (isCartModalOpen) {
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
    };
  }, [
    isCartModalOpen,
    closeCartModal,
  ]);

  return (
    <div
      className={`
        fixed
        inset-0
        z-99999
        h-screen
        w-full
        overflow-y-auto
        bg-dark/70
        no-scrollbar
        transition-transform
        duration-300
        ease-linear
        ${
          isCartModalOpen
            ? "translate-x-0"
            : "translate-x-full"
        }
      `}
      aria-hidden={!isCartModalOpen}
    >
      <div className="flex min-h-full items-start justify-end">
        <div
          className="
            modal-content
            relative
            flex
            min-h-screen
            w-full
            max-w-[500px]
            flex-col
            bg-white
            shadow-2
          "
          role="dialog"
          aria-modal="true"
          aria-label="Shopping cart"
        >

          {/* =================================================
              HEADER
              ================================================= */}

          <div
            className="
              sticky
              top-0
              z-10
              flex
              items-center
              justify-between
              border-b
              border-gray-3
              bg-white
              px-5
              pb-5
              pt-5
              sm:px-7.5
              sm:pb-6
              sm:pt-7.5
              lg:px-10
              lg:pb-6
              lg:pt-9
            "
          >
            <div>
              <h2
                className="
                  text-xl
                  font-semibold
                  tracking-tight
                  text-dark
                  sm:text-2xl
                "
              >
                Cart View
              </h2>

              {cartItems.length > 0 && (
                <p
                  className="
                    mt-1
                    text-sm
                    text-dark-4
                  "
                >
                  {cartItems.length}{" "}
                  {cartItems.length === 1
                    ? "item"
                    : "items"}{" "}
                  in your cart
                </p>
              )}
            </div>

            {/* =================================================
                CLOSE BUTTON
                ================================================= */}

            <button
              type="button"
              onClick={closeCartModal}
              aria-label="Close cart"
              className="
                group
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-gray-3
                bg-white
                text-dark-4
                transition-all
                duration-200
                hover:border-orange
                hover:bg-orange
                hover:text-white
                focus:outline-none
                focus:ring-2
                focus:ring-orange/30
                focus:ring-offset-2
                active:scale-95
                sm:h-11
                sm:w-11
              "
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="
                  transition-transform
                  duration-200
                  group-hover:rotate-90
                "
              >
                <path
                  d="M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                <path
                  d="M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* =================================================
              CART ITEMS
              ================================================= */}

          <div
            className="
              flex-1
              overflow-y-auto
              px-5
              py-6
              no-scrollbar
              sm:px-7.5
              lg:px-10
            "
          >
            <div className="flex flex-col gap-6">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <SingleItem
                    key={item.id}
                    item={item}
                  />
                ))
              ) : (
                <EmptyCart />
              )}
            </div>
          </div>

          {/* =================================================
              FOOTER
              ================================================= */}

          <div
            className="
              sticky
              bottom-0
              border-t
              border-gray-3
              bg-white
              px-5
              pb-5
              pt-5
              sm:px-7.5
              sm:pb-7.5
              lg:px-10
              lg:pb-9
            "
          >
            {/* =================================================
                SUBTOTAL
                ================================================= */}

            <div
              className="
                mb-5
                flex
                items-center
                justify-between
                gap-5
              "
            >
              <p
                className="
                  text-lg
                  font-semibold
                  text-dark
                "
              >
                Subtotal
              </p>

              <p
                className="
                  text-xl
                  font-bold
                  tracking-tight
                  text-orange
                "
              >
                ${totalPrice.toFixed(2)}
              </p>
            </div>

            {/* =================================================
                ACTIONS
                ================================================= */}

            <div
              className="
                flex
                flex-col
                gap-3
                sm:flex-row
              "
            >
              <Link
                onClick={closeCartModal}
                href="/cart"
                className="
                  flex
                  min-h-[48px]
                  w-full
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-blue
                  bg-white
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-blue
                  transition-all
                  duration-200
                  hover:border-orange
                  hover:bg-orange
                  hover:text-white
                  focus:outline-none
                  focus:ring-2
                  focus:ring-orange/30
                  focus:ring-offset-2
                "
              >
                View Cart
              </Link>

              <Link
                href="/checkout"
                className="
                  flex
                  min-h-[48px]
                  w-full
                  items-center
                  justify-center
                  rounded-lg
                  bg-dark
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-200
                  hover:bg-orange
                  focus:outline-none
                  focus:ring-2
                  focus:ring-orange/30
                  focus:ring-offset-2
                "
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebarModal;