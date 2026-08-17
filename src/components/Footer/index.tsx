"use client";

import React, { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();

  const [zipCode, setZipCode] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleStoreSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!zipCode.trim()) return;

    /*
     * =========================================================
     * STORE LOCATOR
     * =========================================================
     *
     * The UI is ready for the Store Locator API.
     *
     * Connect the API here once the endpoint defined by the
     * project requirements is available.
     *
     * Example expected flow:
     *
     * ZIP Code
     *    ↓
     * Store Locator API
     *    ↓
     * Nearest store
     *    ↓
     * Store name / address / distance / map
     */

    setIsSearching(true);

    // Temporary delay for UI feedback.
    // Replace with the real API request.
    setTimeout(() => {
      setIsSearching(false);
    }, 700);
  };

  return (
    <footer className="overflow-hidden bg-white">
      {/* =======================================================
          FOOTER MAIN
          ======================================================= */}

      <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="grid gap-10 border-t border-gray-3 py-16 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] xl:gap-16 xl:py-20">

          {/* ===================================================
              HELP & SUPPORT
              =================================================== */}

          <div className="w-full">
            <h2 className="mb-7 text-sm font-semibold uppercase tracking-wide text-dark">
              Help & Support
            </h2>

            <ul className="flex flex-col gap-4 text-sm text-dark-4">

              <li>
                <a
                  href="#"
                  className="transition-colors duration-200 hover:text-[#F4512A]"
                >
                  Frequently Asked Questions
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition-colors duration-200 hover:text-[#F4512A]"
                >
                  Contact Support
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition-colors duration-200 hover:text-[#F4512A]"
                >
                  Shipping Information
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition-colors duration-200 hover:text-[#F4512A]"
                >
                  Returns & Refunds
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition-colors duration-200 hover:text-[#F4512A]"
                >
                  +52 55 3233 4880
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition-colors duration-200 hover:text-[#F4512A]"
                >
                  support@wildfork.mx
                </a>
              </li>
            </ul>

            {/* =================================================
                SOCIAL LINKS
                ================================================= */}

            <div className="mt-7 flex items-center gap-4">

              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-3 text-dark transition-all duration-200 hover:border-[#F4512A] hover:bg-[#F4512A] hover:text-white"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 18 18"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.99984 0.666504C7.48706 0.666504 6.09165 1.04648 4.81361 1.80644C3.53557 2.54019 2.51836 3.5491 1.76197 4.83317C1.03166 6.11724 0.666504 7.51923 0.666504 9.03915C0.666504 10.428 0.966452 11.7252 1.56635 12.9307C2.19233 14.1099 3.04 15.0926 4.10938 15.8788C5.17876 16.6649 6.37855 17.1497 7.70876 17.3332V11.4763H5.59608V9.03915H7.70876V7.19166C7.70876 6.16965 7.98262 5.37038 8.53035 4.79386C9.10417 4.21734 9.8736 3.92908 10.8386 3.92908C11.4646 3.92908 12.0906 3.98149 12.7166 4.08632V6.16965H11.6602C11.1908 6.16965 10.8386 6.30068 10.6039 6.56273C10.3952 6.79858 10.2909 7.09994 10.2909 7.46682V9.03915H12.6383L12.2471 11.4763H10.2909V17.3332C11.6472 17.1235 12.86 16.6256 13.9294 15.8395C14.9988 15.0533 15.8334 14.0706 16.4333 12.8913C17.0332 11.6859 17.3332 10.4018 17.3332 9.03915C17.3332 7.51923 16.955 6.11724 16.1986 4.83317C15.4683 3.5491 14.4641 2.54019 13.1861 1.80644C11.908 1.04648 10.5126 0.666504 8.99984 0.666504Z" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="#"
                aria-label="X"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-3 text-dark transition-all duration-200 hover:border-[#F4512A] hover:bg-[#F4512A] hover:text-white"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15.7 2H18.8L12.02 9.75L20 18H13.75L8.85 12.92L4.4 18H1.3L8.55 9.72L.9 2H7.3L11.72 6.65L15.7 2ZM14.6 16.55H16.32L6.38 3.37H4.53L14.6 16.55Z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-3 text-dark transition-all duration-200 hover:border-[#F4512A] hover:bg-[#F4512A] hover:text-white"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14.5 1H5.5C3.01 1 1 3.01 1 5.5V14.5C1 16.99 3.01 19 5.5 19H14.5C16.99 19 19 16.99 19 14.5V5.5C19 3.01 16.99 1 14.5 1ZM10 14.75C7.38 14.75 5.25 12.62 5.25 10C5.25 7.38 7.38 5.25 10 5.25C12.62 5.25 14.75 7.38 14.75 10C14.75 12.62 12.62 14.75 10 14.75ZM15.25 5.75C14.7 5.75 14.25 5.3 14.25 4.75C14.25 4.2 14.7 3.75 15.25 3.75C15.8 3.75 16.25 4.2 16.25 4.75C16.25 5.3 15.8 5.75 15.25 5.75Z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-3 text-dark transition-all duration-200 hover:border-[#F4512A] hover:bg-[#F4512A] hover:text-white"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.5 1.5H2.5C1.95 1.5 1.5 1.95 1.5 2.5V17.5C1.5 18.05 1.95 18.5 2.5 18.5H17.5C18.05 18.5 18.5 18.05 18.5 17.5V2.5C18.5 1.95 18.05 1.5 17.5 1.5ZM6.25 15.75H4V8H6.25V15.75ZM5.12 6.95C4.4 6.95 3.82 6.37 3.82 5.65C3.82 4.93 4.4 4.35 5.12 4.35C5.84 4.35 6.42 4.93 6.42 5.65C6.42 6.37 5.84 6.95 5.12 6.95ZM16 15.75H13.75V11.95C13.75 11.05 13.73 9.9 12.5 9.9C11.25 9.9 11.05 10.87 11.05 11.88V15.75H8.8V8H10.95V9.05H10.98C11.28 8.45 12.01 7.82 13.18 7.82C15.46 7.82 16 9.32 16 11.27V15.75Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* ===================================================
              ACCOUNT
              =================================================== */}

          <div className="w-full">
            <h2 className="mb-7 text-sm font-semibold uppercase tracking-wide text-dark">
              Account
            </h2>

            <ul className="flex flex-col gap-3.5 text-sm text-dark-4">
              <li>
                <Link
                  href="#"
                  className="transition-colors duration-200 hover:text-[#F4512A]"
                >
                  My Account
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="transition-colors duration-200 hover:text-[#F4512A]"
                >
                  Login / Register
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="transition-colors duration-200 hover:text-[#F4512A]"
                >
                  Cart
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="transition-colors duration-200 hover:text-[#F4512A]"
                >
                  Shop
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="transition-colors duration-200 hover:text-[#F4512A]"
                >
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* ===================================================
              QUICK LINKS
              =================================================== */}

          <div className="w-full">
            <h2 className="mb-7 text-sm font-semibold uppercase tracking-wide text-dark">
              Quick Links
            </h2>

            <ul className="flex flex-col gap-3.5 text-sm text-dark-4">
              <li>
                <Link
                  href="#"
                  className="transition-colors duration-200 hover:text-[#F4512A]"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="transition-colors duration-200 hover:text-[#F4512A]"
                >
                  Refund Policy
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="transition-colors duration-200 hover:text-[#F4512A]"
                >
                  Terms of Use
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="transition-colors duration-200 hover:text-[#F4512A]"
                >
                  FAQs
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="transition-colors duration-200 hover:text-[#F4512A]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* ===================================================
              STORE LOCATOR
              =================================================== */}

          <div className="w-full">
            <div className="mb-7 flex items-start gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F4512A]/10 text-[#F4512A]">
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M12 21C16.5 16.5 19 13.2 19 9.5C19 5.91 15.866 3 12 3C8.134 3 5 5.91 5 9.5C5 13.2 7.5 16.5 12 21Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />

                  <circle
                    cx="12"
                    cy="9"
                    r="2.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              <div>
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#F4512A]">
                  Store Locator
                </span>

                <h2 className="text-lg font-semibold text-dark">
                  Find your nearest store
                </h2>

                <p className="mt-1 text-sm leading-5 text-dark-4">
                  Enter your ZIP code to find the closest location.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleStoreSearch}
              className="flex flex-col gap-3"
            >
              <label
                htmlFor="store-zip"
                className="sr-only"
              >
                ZIP code
              </label>

              <input
                id="store-zip"
                name="zip"
                type="text"
                inputMode="numeric"
                maxLength={5}
                value={zipCode}
                onChange={(event) =>
                  setZipCode(
                    event.target.value.replace(/\D/g, ""),
                  )
                }
                placeholder="Enter ZIP code"
                className="h-11 w-full rounded-md border border-gray-3 bg-white px-4 text-sm text-dark outline-none transition duration-200 placeholder:text-dark-4 focus:border-[#F4512A] focus:ring-2 focus:ring-[#F4512A]/10"
              />

              <button
                type="submit"
                disabled={
                  zipCode.length < 5 || isSearching
                }
                className="inline-flex h-11 w-full items-center justify-center rounded-md bg-[#1C294A] px-6 text-sm font-medium text-white transition-all duration-200 hover:bg-[#F4512A] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSearching ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Finding store...
                  </>
                ) : (
                  <>
                    Find Store
                    <svg
                      className="ml-2"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 12H19M19 12L13 6M19 12L13 18"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* API result will be rendered here */}
            <div className="mt-5 rounded-lg border border-dashed border-gray-3 bg-white p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-[#F4512A]">
                Store availability
              </p>

              <p className="mt-1 text-sm text-dark-4">
                Enter your ZIP code to discover the nearest store.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =======================================================
          FOOTER BOTTOM
          ======================================================= */}

      <div className="border-t border-gray-3 bg-[#F6F7FB]">
        <div className="mx-auto w-full max-w-[1170px] px-4 py-6 sm:px-8 xl:px-0">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            {/* =================================================
                COPYRIGHT / DEVELOPER
                ================================================= */}

            <div>
              <p className="text-sm font-medium text-dark">
                © {year} Wild Fork. All rights reserved.
              </p>

              <p className="mt-1 text-xs text-dark-4">
                Developed by{" "}
                <span className="font-semibold text-dark">
                  Juan Carlos Zepeda
                </span>{" "}
                — Senior Front-End Engineer
              </p>
            </div>

            {/* =================================================
                PAYMENT METHODS
                ================================================= */}

            <div className="flex flex-wrap items-center gap-4">

              <p className="text-sm font-medium text-dark">
                We Accept:
              </p>

              <div className="flex items-center gap-5">

                <Image
                  src="/images/payment/payment-01.svg"
                  alt="Visa"
                  width={55}
                  height={20}
                />

                <Image
                  src="/images/payment/payment-02.svg"
                  alt="PayPal"
                  width={18}
                  height={21}
                />

                <Image
                  src="/images/payment/payment-03.svg"
                  alt="Mastercard"
                  width={33}
                  height={24}
                />

                <Image
                  src="/images/payment/payment-04.svg"
                  alt="Apple Pay"
                  width={52}
                  height={22}
                />

                <Image
                  src="/images/payment/payment-05.svg"
                  alt="Google Pay"
                  width={56}
                  height={22}
                />

              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;