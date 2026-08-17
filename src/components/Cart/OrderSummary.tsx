"use client";

import React from "react";
import { useSelector } from "react-redux";

import { selectTotalPrice } from "@/features/cart/store/cart.slice";
import { useAppSelector } from "@/redux/store";

const OrderSummary = () => {
  const cartItems = useAppSelector(
    (state) => state.cart.items,
  );

  const totalPrice = useSelector(selectTotalPrice);

  return (
    <div className="w-full lg:max-w-[455px]">
      {/* =====================================================
          ORDER SUMMARY
          ===================================================== */}
      <div className="overflow-hidden rounded-2xl border border-gray-3 bg-white shadow-1">
        {/* =================================================
            HEADER
            ================================================= */}
        <div className="border-b border-gray-3 px-4 py-5 sm:px-6 lg:px-8.5">
          <h3 className="text-xl font-semibold text-dark sm:text-2xl">
            Order Summary
          </h3>
        </div>

        {/* =================================================
            CONTENT
            ================================================= */}
        <div className="px-4 pb-7 pt-2.5 sm:px-6 sm:pb-8 lg:px-8.5">
          {/* =================================================
              TABLE HEADER
              ================================================= */}
          <div className="flex items-center justify-between border-b border-gray-3 py-5">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-dark-4">
              Product
            </h4>

            <h4 className="text-sm font-semibold uppercase tracking-wide text-dark-4">
              Subtotal
            </h4>
          </div>

          {/* =================================================
              PRODUCTS
              ================================================= */}
          {cartItems.length > 0 ? (
            <div>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="
                    flex
                    items-start
                    justify-between
                    gap-4
                    border-b
                    border-gray-3
                    py-5
                  "
                >
                  {/* Product information */}
                  <div className="min-w-0 flex-1">
                    <p
                      className="
                        text-sm
                        font-medium
                        leading-5
                        text-dark
                        sm:text-base
                      "
                    >
                      {item.title}
                    </p>

                    <p className="mt-1 text-xs text-dark-4 sm:text-sm">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  {/* Product subtotal */}
                  <div className="shrink-0">
                    <p className="text-sm font-medium text-dark sm:text-base">
                      $
                      {(
                        item.discountedPrice *
                        item.quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* =================================================
               EMPTY ORDER
               ================================================= */
            <div className="border-b border-gray-3 py-8 text-center">
              <p className="text-sm text-dark-4">
                Your cart is empty.
              </p>
            </div>
          )}

          {/* =================================================
              TOTAL
              ================================================= */}
          <div className="flex items-center justify-between gap-4 pt-5">
            <p className="text-lg font-semibold text-dark">
              Total
            </p>

            <p className="text-xl font-bold text-orange sm:text-2xl">
              ${Number(totalPrice).toFixed(2)}
            </p>
          </div>

          {/* =================================================
              CHECKOUT BUTTON
              Demo only: no action
              ================================================= */}
          <button
            type="button"
            disabled={cartItems.length === 0}
            aria-label="Process to checkout"
            className="
              mt-7
              flex
              min-h-12
              w-full
              items-center
              justify-center
              rounded-md
              bg-dark
              px-6
              py-3
              text-sm
              font-semibold
              text-white
              shadow-1
              transition-all
              duration-200

              hover:-translate-y-0.5
              hover:bg-orange
              hover:shadow-2

              focus:outline-none
              focus:ring-2
              focus:ring-orange
              focus:ring-offset-2

              active:translate-y-0

              disabled:cursor-not-allowed
              disabled:bg-gray-3
              disabled:text-dark-4
              disabled:shadow-none
              disabled:hover:translate-y-0
              disabled:hover:bg-gray-3
              disabled:hover:shadow-none
            "
          >
            Process to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;