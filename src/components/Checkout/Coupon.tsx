"use client";

import React from "react";

const Coupon = () => {
  return (
    <div className="mt-7.5 overflow-hidden rounded-xl border border-gray-3 bg-white shadow-1">
      {/* =====================================================
          HEADER
          ===================================================== */}
      <div className="border-b border-gray-3 px-5 py-5 sm:px-7">
        <h3 className="text-xl font-semibold tracking-tight text-dark">
          Have any Coupon Code?
        </h3>
      </div>

      {/* =====================================================
          COUPON FORM
          ===================================================== */}
      <div className="px-5 py-6 sm:px-7 sm:py-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          {/* Coupon input */}
          <input
            type="text"
            name="coupon"
            id="coupon"
            placeholder="Enter coupon code"
            className="
              min-h-12
              w-full
              rounded-lg
              border
              border-gray-3
              bg-gray-1
              px-5
              py-3
              text-sm
              text-dark
              outline-none
              transition-all
              duration-200
              placeholder:text-dark-5
              focus:border-orange
              focus:bg-white
              focus:ring-2
              focus:ring-orange/10
              sm:flex-1
            "
          />

          {/* Apply button */}
          <button
            type="button"
            className="
              inline-flex
              min-h-12
              w-full
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-dark
              px-7
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
              sm:w-auto
            "
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Coupon;