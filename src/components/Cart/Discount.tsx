"use client";

import React from "react";

const Discount = () => {
  return (
    <div className="w-full lg:max-w-[670px]">
      
        {/* =====================================================
            DISCOUNT / COUPON
            ===================================================== */}
        <div className="overflow-hidden rounded-2xl border border-gray-3 bg-white shadow-1">
          {/* Header */}
          <div className="border-b border-gray-3 px-4 py-5 sm:px-6 lg:px-7">
            <h3 className="text-lg font-medium text-dark sm:text-xl">
              Have any discount code?
            </h3>
          </div>

          {/* Content */}
          <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8.5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
              {/* Coupon input */}
              <div className="min-w-0 flex-1">
                <label
                  htmlFor="coupon"
                  className="sr-only"
                >
                  Discount code
                </label>

                <input
                  type="text"
                  name="coupon"
                  id="coupon"
                  placeholder="Enter coupon code"
                  className="
                    h-12
                    w-full
                    rounded-md
                    border
                    border-gray-3
                    bg-gray-1
                    px-5
                    text-sm
                    text-dark
                    placeholder:text-dark-5
                    outline-none
                    transition-all
                    duration-200
                    focus:border-orange
                    focus:bg-white
                    focus:ring-2
                    focus:ring-orange/20
                  "
                />
              </div>

              {/* Apply button */}
              <button
                
                className="
                  inline-flex
                  h-12
                  w-full
                  shrink-0
                  items-center
                  justify-center
                  rounded-md
                  bg-dark
                  px-7
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
                Apply Code
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Discount;