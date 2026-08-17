"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import type {
  AppDispatch,
  RootState,
} from "@/redux/store";

import { clearCart } from "@/features/cart/store/cart.slice";

import Breadcrumb from "../Common/Breadcrumb";
import Discount from "./Discount";
import OrderSummary from "./OrderSummary";
import SingleItem from "./SingleItem";

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();

  const cartItems = useSelector(
    (state: RootState) => state.cart.items,
  );

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const itemCount = cartItems.length;

  return (
    <>
      {/* =====================================================
          BREADCRUMB
          ===================================================== */}

      <section>
        <Breadcrumb
          title="Cart"
          pages={["Cart"]}
        />
      </section>

      {cartItems.length > 0 ? (
        <section className="bg-gray-1 py-10 sm:py-12 lg:py-16">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* =================================================
                PAGE HEADER
                ================================================= */}

            <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
              <div>
                {/* Eyebrow */}
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange" />

                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-dark-4">
                    Shopping Cart
                  </span>
                </div>

                <h1 className="text-3xl font-semibold tracking-tight text-dark sm:text-4xl">
                  Your Cart
                </h1>

                <p className="mt-2 text-sm text-dark-4 sm:text-base">
                  {itemCount}{" "}
                  {itemCount === 1
                    ? "item"
                    : "items"}{" "}
                  ready for checkout
                </p>
              </div>

              {/* Clear cart */}
              <button
                type="button"
                onClick={handleClearCart}
                className="
                  inline-flex
                  min-h-11
                  w-full
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-gray-3
                  bg-white
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-dark-4
                  shadow-1
                  transition-all
                  duration-200
                  hover:border-red
                  hover:bg-red-light-6
                  hover:text-red
                  focus:outline-none
                  focus:ring-2
                  focus:ring-red/20
                  focus:ring-offset-2
                  sm:w-auto
                "
              >
                Clear Shopping Cart
              </button>
            </div>

            {/* =================================================
                CART ITEMS
                ================================================= */}

            <div
              className="
                overflow-hidden
                rounded-2xl
                border
                border-gray-3
                bg-white
                shadow-1
              "
            >
              {/* =================================================
                  CART HEADER
                  ================================================= */}

              <div
                className="
                  hidden
                  border-b
                  border-gray-3
                  bg-gray-1
                  px-6
                  py-4
                  md:grid
                  md:grid-cols-[minmax(280px,2fr)_minmax(120px,1fr)_minmax(160px,1fr)_minmax(120px,1fr)_52px]
                  md:items-center
                  md:gap-6
                  lg:px-7
                "
              >
                <p className="text-xs font-semibold uppercase tracking-[0.06em] text-dark-4">
                  Product
                </p>

                <p className="text-xs font-semibold uppercase tracking-[0.06em] text-dark-4">
                  Price
                </p>

                <p className="text-xs font-semibold uppercase tracking-[0.06em] text-dark-4">
                  Quantity
                </p>

                <p className="text-xs font-semibold uppercase tracking-[0.06em] text-dark-4">
                  Subtotal
                </p>

                <span className="sr-only">
                  Actions
                </span>
              </div>

              {/* =================================================
                  CART ITEMS
                  ================================================= */}

              <div>
                {cartItems.map((item) => (
                  <SingleItem
                    item={item}
                    key={item.id}
                  />
                ))}
              </div>
            </div>

            {/* =================================================
                LOWER CONTENT
                ================================================= */}

            <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)] lg:items-start lg:gap-8">

              {/* =================================================
                  DISCOUNT
                  ================================================= */}

              <div
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-gray-3
                  bg-white
                  shadow-1
                "
              >
                <Discount />
              </div>

              {/* =================================================
                  ORDER SUMMARY
                  ================================================= */}

              <div
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-gray-3
                  bg-white
                  shadow-1
                  lg:sticky
                  lg:top-6
                "
              >
                <OrderSummary />
              </div>
            </div>

            {/* =================================================
                CONTINUE SHOPPING
                ================================================= */}

            <div className="mt-6 flex justify-center sm:justify-start">
              <Link
                href="/products"
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-blue
                  transition-colors
                  duration-200
                  hover:text-orange
                  focus:outline-none
                  focus:ring-2
                  focus:ring-orange/20
                  focus:ring-offset-2
                "
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M19 12H5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M10 7L5 12L10 17"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                Continue Shopping
              </Link>
            </div>
          </div>
        </section>
      ) : (
        /* =====================================================
           EMPTY CART
           ===================================================== */

        <section className="bg-gray-1 px-4 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto flex max-w-xl flex-col items-center text-center">

            {/* Icon */}
            <div
              className="
                mb-7
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                border
                border-gray-3
                bg-white
                shadow-1
                sm:h-24
                sm:w-24
              "
            >
              <svg
                width="42"
                height="42"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="text-orange"
              >
                <path
                  d="M3 4H5L7.2 14.2C7.4 15.2 8.3 16 9.3 16H17.5C18.4 16 19.2 15.4 19.5 14.5L21 8H6"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <circle
                  cx="10"
                  cy="20"
                  r="1"
                  fill="currentColor"
                />

                <circle
                  cx="18"
                  cy="20"
                  r="1"
                  fill="currentColor"
                />
              </svg>
            </div>

            {/* Heading */}
            <h2 className="text-2xl font-semibold tracking-tight text-dark sm:text-3xl">
              Your cart is empty
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-dark-4 sm:text-base">
              Looks like you haven't added anything
              to your cart yet. Explore our products
              and find something you love.
            </p>

            {/* CTA */}
            <Link
              href="/products"
              className="
                mt-7
                inline-flex
                min-h-12
                w-full
                max-w-xs
                items-center
                justify-center
                rounded-lg
                bg-dark
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                shadow-1
                transition-all
                duration-200
                hover:bg-orange
                hover:shadow-2
                focus:outline-none
                focus:ring-2
                focus:ring-orange/30
                focus:ring-offset-2
              "
            >
              Continue Shopping
            </Link>
          </div>
        </section>
      )}
    </>
  );
};

export default Cart;