"use client";

import React, { useState } from "react";

const Login = () => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-3 bg-white shadow-1">
      {/* =====================================================
          LOGIN TOGGLE
          ===================================================== */}
      <button
        type="button"
        onClick={() => setDropdown(!dropdown)}
        aria-expanded={dropdown}
        aria-controls="checkout-login-panel"
        className={`
          flex
          w-full
          cursor-pointer
          items-center
          gap-1
          px-5
          py-5
          text-left
          text-sm
          text-dark-4
          transition-colors
          duration-200
          hover:text-dark
          sm:px-6
          ${
            dropdown
              ? "border-b border-gray-3"
              : ""
          }
        `}
      >
        <span>Returning customer?</span>

        <span
          className="
            flex
            items-center
            gap-2
            pl-1
            font-medium
            text-dark
          "
        >
          Click here to login

          <svg
            className={`
              h-[22px]
              w-[22px]
              fill-current
              transition-transform
              duration-200
              ease-out
              ${
                dropdown
                  ? "rotate-180"
                  : ""
              }
            `}
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.06103 7.80259C4.30813 7.51431 4.74215 7.48092 5.03044 7.72802L10.9997 12.8445L16.9689 7.72802L16.9689 7.72802C17.2572 7.48092 17.6912 7.51431 17.9383 7.80259C18.1854 8.09088 18.1521 8.5249 17.8638 8.772L11.4471 14.272C11.1896 14.4927 10.8097 14.4927 10.5523 14.272L4.1356 8.772C3.84731 8.5249 3.81393 8.09088 4.06103 7.80259Z"
            />
          </svg>
        </span>
      </button>

      {/* =====================================================
          LOGIN PANEL
          ===================================================== */}
      <div
        id="checkout-login-panel"
        className={`
          ${
            dropdown
              ? "block"
              : "hidden"
          }
          px-4
          pb-8
          pt-7
          sm:px-8
          sm:pb-8.5
          sm:pt-7.5
        `}
      >
        <p className="mb-6 text-sm leading-6 text-dark-4">
          If you didn&apos;t log in,
          please log in first.
        </p>

        {/* =================================================
            USERNAME / EMAIL
            ================================================= */}
        <div className="mb-5">
          <label
            htmlFor="checkout-username"
            className="
              mb-2.5
              block
              text-sm
              font-medium
              text-dark
            "
          >
            Username or Email
          </label>

          <input
            type="text"
            name="name"
            id="checkout-username"
            autoComplete="username"
            className="
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
            "
          />
        </div>

        {/* =================================================
            PASSWORD
            ================================================= */}
        <div className="mb-5">
          <label
            htmlFor="checkout-password"
            className="
              mb-2.5
              block
              text-sm
              font-medium
              text-dark
            "
          >
            Password
          </label>

          <input
            type="password"
            name="password"
            id="checkout-password"
            autoComplete="current-password"
            className="
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
            "
          />
        </div>

        {/* =================================================
            LOGIN BUTTON
            ================================================= */}
        <button
          type="button"
          className="
            inline-flex
            min-h-12
            items-center
            justify-center
            rounded-lg
            bg-dark
            px-10
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
          "
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;