"use client";

import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

import type { RootState } from "@/redux/store";

import Breadcrumb from "../Common/Breadcrumb";
import Login from "./Login";
import Shipping from "./Shipping";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
import Coupon from "./Coupon";
import Billing from "./Billing";

const SHIPPING_FEE = 15;

const Checkout = () => {
  const cartItems = useSelector(
    (state: RootState) => state.cart.items,
  );

  /**
   * =========================================================
   * CART TOTALS
   * =========================================================
   */

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0,
  );

  const shippingFee =
    cartItems.length > 0
      ? SHIPPING_FEE
      : 0;

  const total = subtotal + shippingFee;

  /**
   * =========================================================
   * EMPTY CART
   * =========================================================
   */

  if (cartItems.length === 0) {
    return (
      <>
        <Breadcrumb
          title="Checkout"
          pages={["checkout"]}
        />

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
            <h1
              className="
                text-2xl
                font-semibold
                tracking-tight
                text-dark
                sm:text-3xl
              "
            >
              Your cart is empty
            </h1>

            <p
              className="
                mt-3
                max-w-md
                text-sm
                leading-6
                text-dark-4
                sm:text-base
              "
            >
              There are no products in your cart.
              Add products before proceeding to
              checkout.
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
      </>
    );
  }

  /**
   * =========================================================
   * CHECKOUT
   * =========================================================
   */

  return (
    <>
      <Breadcrumb
        title="Checkout"
        pages={["checkout"]}
      />

      <section className="overflow-hidden bg-gray-1 py-10 sm:py-14 lg:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

          <form>
            <div className="flex flex-col gap-7.5 lg:flex-row lg:items-start xl:gap-10">

              {/* =================================================
                  CHECKOUT LEFT
                  ================================================= */}

              <div className="w-full lg:max-w-[670px] lg:flex-1">

                {/* Login */}
                <Login />

                {/* Billing */}
                <Billing />

                {/* Shipping */}
                <Shipping />

                {/* Notes */}
                <div
                  className="
                    mt-6
                    rounded-xl
                    border
                    border-gray-3
                    bg-white
                    p-5
                    shadow-1
                    sm:mt-7.5
                    sm:p-7
                  "
                >
                  <div>
                    <label
                      htmlFor="notes"
                      className="
                        mb-2.5
                        block
                        text-sm
                        font-medium
                        text-dark
                      "
                    >
                      Other Notes
                      <span className="ml-1 text-dark-4">
                        (optional)
                      </span>
                    </label>

                    <textarea
                      name="notes"
                      id="notes"
                      rows={5}
                      placeholder="Notes about your order, e.g. special notes for delivery."
                      className="
                        w-full
                        rounded-lg
                        border
                        border-gray-3
                        bg-gray-1
                        p-4
                        text-sm
                        text-dark
                        outline-none
                        transition-all
                        duration-200
                        placeholder:text-dark-5
                        focus:border-blue
                        focus:bg-white
                        focus:ring-2
                        focus:ring-blue/10
                      "
                    />
                  </div>
                </div>
              </div>

              {/* =================================================
                  CHECKOUT RIGHT
                  ================================================= */}

              <div className="w-full lg:max-w-[455px]">

                {/* =================================================
                    ORDER SUMMARY
                    ================================================= */}

                <div
                  className="
                    overflow-hidden
                    rounded-xl
                    border
                    border-gray-3
                    bg-white
                    shadow-1
                    lg:sticky
                    lg:top-6
                  "
                >

                  {/* Header */}
                  <div
                    className="
                      border-b
                      border-gray-3
                      px-5
                      py-5
                      sm:px-7
                    "
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h2
                        className="
                          text-xl
                          font-semibold
                          tracking-tight
                          text-dark
                        "
                      >
                        Your Order
                      </h2>

                      <span
                        className="
                          rounded-full
                          bg-gray-1
                          px-3
                          py-1
                          text-xs
                          font-semibold
                          text-dark-4
                        "
                      >
                        {cartItems.length}{" "}
                        {cartItems.length === 1
                          ? "item"
                          : "items"}
                      </span>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="px-5 sm:px-7">

                    {/* Column headers */}
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-4
                        border-b
                        border-gray-3
                        py-4
                      "
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.06em] text-dark-4">
                        Product
                      </p>

                      <p className="text-xs font-semibold uppercase tracking-[0.06em] text-dark-4">
                        Subtotal
                      </p>
                    </div>

                    {/* Dynamic products */}
                    <div>
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="
                            flex
                            items-center
                            justify-between
                            gap-4
                            border-b
                            border-gray-3
                            py-4
                          "
                        >
                          <div className="min-w-0 flex-1">

                            <p
                              className="
                                line-clamp-2
                                text-sm
                                font-medium
                                leading-5
                                text-dark
                              "
                            >
                              {item.title}
                            </p>

                            <p
                              className="
                                mt-1
                                text-xs
                                text-dark-4
                              "
                            >
                              Qty: {item.quantity}
                            </p>
                          </div>

                          <p
                            className="
                              shrink-0
                              text-sm
                              font-medium
                              text-dark
                            "
                          >
                            $
                            {(
                              item.price *
                              item.quantity
                            ).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* =================================================
                        TOTALS
                        ================================================= */}

                    <div className="py-5">

                      {/* Subtotal */}
                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          gap-4
                        "
                      >
                        <p className="text-sm text-dark-4">
                          Subtotal
                        </p>

                        <p className="text-sm font-medium text-dark">
                          ${subtotal.toFixed(2)}
                        </p>
                      </div>

                      {/* Shipping */}
                      <div
                        className="
                          mt-3
                          flex
                          items-center
                          justify-between
                          gap-4
                        "
                      >
                        <p className="text-sm text-dark-4">
                          Shipping
                        </p>

                        <p className="text-sm font-medium text-dark">
                          ${shippingFee.toFixed(2)}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="my-5 h-px bg-gray-3" />

                      {/* Total */}
                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          gap-4
                        "
                      >
                        <p
                          className="
                            text-lg
                            font-semibold
                            text-dark
                          "
                        >
                          Total
                        </p>

                        <p
                          className="
                            text-xl
                            font-bold
                            tracking-tight
                            text-orange
                          "
                        >
                          ${total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    COUPON
                    ================================================= */}

                <Coupon />

                {/* =================================================
                    SHIPPING METHOD
                    ================================================= */}

                <ShippingMethod />

                {/* =================================================
                    PAYMENT METHOD
                    ================================================= */}

                <PaymentMethod />

                {/* =================================================
                    CHECKOUT BUTTON
                    ================================================= */}

                <button
                  type="submit"
                  className="
                    mt-6
                    flex
                    min-h-12
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
                    shadow-1
                    transition-all
                    duration-200
                    hover:bg-orange
                    hover:shadow-2
                    focus:outline-none
                    focus:ring-2
                    focus:ring-orange/30
                    focus:ring-offset-2
                    sm:mt-7.5
                  "
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Checkout;