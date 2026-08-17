"use client";

import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import Link from "next/link";
import Image from "next/image";

import { useAppSelector } from "@/redux/store";

import {
  selectCartItemCount,
  selectTotalPrice,
} from "@/features/cart/store/cart.slice";

import { useCartModalContext } from "@/app/context/CartSidebarModalContext";

import { useProductFilters } from "@/features/products/context/ProductFiltersContext";

import { useProducts } from "@/features/products/hooks/use-products";

type SortOption =
  | "default"
  | "asc"
  | "desc";

const Header = () => {
  const [navigationOpen, setNavigationOpen] =
    useState(false);

  const [stickyMenu, setStickyMenu] =
    useState(false);

  /*
   * =========================================================
   * GLOBAL PRODUCT FILTERS
   *
   * Shared with /products
   * =========================================================
   */

  const {
    searchQuery,
    category,
    sort,
    setSearchQuery,
    setCategory,
    setSort,
  } = useProductFilters();

  /*
   * =========================================================
   * PRODUCTS API
   * =========================================================
   */

  const { data } = useProducts();

  const products = data?.products ?? [];

  /*
   * =========================================================
   * CATEGORIES FROM API
   * =========================================================
   */

  const categories = useMemo<string[]>(
    () => {
      const values = products
        .map((product) =>
          String(
            product.category ?? "",
          ),
        )
        .filter(
          (value) =>
            value.length > 0,
        );

      return Array.from(
        new Set<string>(values),
      ).sort();
    },
    [products],
  );

  const categoryOptions =
    useMemo(
      () => [
        {
          label: "All Categories",
          value: "all",
        },

        ...categories.map(
          (value: string) => ({
            label:
              value
                .charAt(0)
                .toUpperCase() +
              value.slice(1),

            value,
          }),
        ),
      ],
      [categories],
    );

  /*
   * =========================================================
   * CART
   * =========================================================
   */

  const cartItemCount =
    useAppSelector(
      selectCartItemCount,
    );

  const totalPrice =
    useAppSelector(
      selectTotalPrice,
    );

  const {
    openCartModal,
  } = useCartModalContext();

  /*
   * =========================================================
   * STICKY HEADER
   * =========================================================
   */

  useEffect(() => {
    const handleStickyMenu =
      () => {
        setStickyMenu(
          window.scrollY >= 80,
        );
      };

    window.addEventListener(
      "scroll",
      handleStickyMenu,
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleStickyMenu,
      );
    };
  }, []);

  /*
   * =========================================================
   * RESPONSIVE NAVIGATION
   * =========================================================
   */

  useEffect(() => {
    const handleResize =
      () => {
        if (
          window.innerWidth >=
          1280
        ) {
          setNavigationOpen(
            false,
          );
        }
      };

    window.addEventListener(
      "resize",
      handleResize,
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize,
      );
    };
  }, []);

  return (
    <header
      className={`wf-header ${
        stickyMenu
          ? "wf-header--sticky"
          : ""
      }`}
    >
      {/* =====================================================
          MAIN HEADER
      ====================================================== */}

      <div className="wf-header-main">
        <div className="wf-header-container">

          <div className="wf-header-row">

            {/* =================================================
                LOGO
            ================================================== */}

            <Link
              href="/"
              className="wf-logo"
              aria-label="Wild Fork Home"
            >
              <Image
                src="/images/logo/logo.svg"
                alt="Wild Fork"
                width={219}
                height={36}
                priority
              />
            </Link>

            {/* =================================================
                DESKTOP FILTERS
            ================================================== */}

            <div className="wf-header-filters">

              {/* =================================================
                  CATEGORY
              ================================================== */}

              <div className="wf-category">

                <span
                  className="wf-category-icon"
                  aria-hidden="true"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M4 7H20"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />

                    <path
                      d="M4 12H20"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />

                    <path
                      d="M4 17H20"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>

                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(
                      event.target.value,
                    )
                  }
                  aria-label="Filter by category"
                >
                  {categoryOptions.map(
                    (option) => (
                      <option
                        key={
                          option.value
                        }
                        value={
                          option.value
                        }
                      >
                        {
                          option.label
                        }
                      </option>
                    ),
                  )}
                </select>

                <span
                  className="wf-chevron"
                  aria-hidden="true"
                >
                  <svg
                    width="11"
                    height="7"
                    viewBox="0 0 11 7"
                    fill="none"
                  >
                    <path
                      d="M1 1L5.5 5.5L10 1"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>

              {/* =================================================
                  SEARCH
              ================================================== */}

              <div className="wf-search">

                <input
                  type="search"
                  value={
                    searchQuery
                  }
                  onChange={(event) =>
                    setSearchQuery(
                      event.target
                        .value,
                    )
                  }
                  placeholder="Search products..."
                  autoComplete="off"
                  aria-label="Search products"
                />

                <span
                  className="wf-search-icon"
                  aria-hidden="true"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="11"
                      cy="11"
                      r="7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />

                    <path
                      d="M16.5 16.5L21 21"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </div>

              {/* =================================================
                  SORT
              ================================================== */}

              <div className="wf-sort">

                <select
                  value={sort}
                  onChange={(event) =>
                    setSort(
                      event.target
                        .value as SortOption,
                    )
                  }
                  aria-label="Sort products"
                >
                  <option value="default">
                    Default
                  </option>

                  <option value="asc">
                    Price: Low to High
                  </option>

                  <option value="desc">
                    Price: High to Low
                  </option>
                </select>

                <span
                  className="wf-chevron"
                  aria-hidden="true"
                >
                  <svg
                    width="11"
                    height="7"
                    viewBox="0 0 11 7"
                    fill="none"
                  >
                    <path
                      d="M1 1L5.5 5.5L10 1"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>

            {/* =================================================
                ACCOUNT
            ================================================== */}

            <Link
              href="/signin"
              className="wf-account"
              aria-label="Sign in"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="7"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />

                <path
                  d="M4 21C4.7 16.8 7.3 14.5 12 14.5C16.7 14.5 19.3 16.8 20 21"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>

              <span>
                <small>
                  ACCOUNT
                </small>

                <strong>
                  Sign In
                </strong>
              </span>
            </Link>

            {/* =================================================
                CART
            ================================================== */}

            <button
              type="button"
              className="wf-cart"
              onClick={
                openCartModal
              }
              aria-label="Open cart"
            >
              <span className="wf-cart-icon">

                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M3 4H5L7.2 15.2C7.4 16.2 8.3 17 9.3 17H17.2C18.2 17 19 16.3 19.3 15.4L21 9H6"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <circle
                    cx="9"
                    cy="20"
                    r="1.2"
                    fill="currentColor"
                  />

                  <circle
                    cx="17"
                    cy="20"
                    r="1.2"
                    fill="currentColor"
                  />
                </svg>

                <span className="wf-cart-count">
                  {cartItemCount}
                </span>
              </span>

              <span>
                <small>
                  CART
                </small>

                <strong>
                  $
                  {totalPrice.toFixed(
                    2,
                  )}
                </strong>
              </span>
            </button>

            {/* =================================================
                MOBILE MENU
            ================================================== */}

            <button
              type="button"
              className="wf-mobile-menu"
              aria-label={
                navigationOpen
                  ? "Close menu"
                  : "Open menu"
              }
              aria-expanded={
                navigationOpen
              }
              onClick={() =>
                setNavigationOpen(
                  (value) =>
                    !value,
                )
              }
            >
              <span />
              <span />
              <span />
            </button>
          </div>

          {/* =================================================
              MOBILE FILTERS
          ================================================== */}

          <div className="wf-mobile-filters">

            <div className="wf-category">

              <span className="wf-category-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4 7H20M4 12H20M4 17H20"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>

              <select
                value={category}
                onChange={(event) =>
                  setCategory(
                    event.target.value,
                  )
                }
                aria-label="Filter by category"
              >
                {categoryOptions.map(
                  (option) => (
                    <option
                      key={
                        option.value
                      }
                      value={
                        option.value
                      }
                    >
                      {
                        option.label
                      }
                    </option>
                  ),
                )}
              </select>

              <span className="wf-chevron">
                <svg
                  width="11"
                  height="7"
                  viewBox="0 0 11 7"
                  fill="none"
                >
                  <path
                    d="M1 1L5.5 5.5L10 1"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            <div className="wf-search">

              <input
                type="search"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(
                    event.target.value,
                  )
                }
                placeholder="Search products..."
                autoComplete="off"
                aria-label="Search products"
              />

              <span className="wf-search-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />

                  <path
                    d="M16.5 16.5L21 21"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </div>

            <div className="wf-sort">

              <select
                value={sort}
                onChange={(event) =>
                  setSort(
                    event.target
                      .value as SortOption,
                  )
                }
                aria-label="Sort products"
              >
                <option value="default">
                  Default
                </option>

                <option value="asc">
                  Price: Low to High
                </option>

                <option value="desc">
                  Price: High to Low
                </option>
              </select>

              <span className="wf-chevron">
                <svg
                  width="11"
                  height="7"
                  viewBox="0 0 11 7"
                  fill="none"
                >
                  <path
                    d="M1 1L5.5 5.5L10 1"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          SECONDARY NAVIGATION
      ====================================================== */}

      <div className="wf-header-nav">
        <div className="wf-header-container">

          <div className="wf-nav-row">

            <nav aria-label="Main navigation">
              <ul>
                <li>
                  <Link href="/">
                    Product Popular 
                  </Link>
                </li>

                <li>
                  <Link href="/products">
                    Product Listing
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label="Featured products">
              <ul>
                <li>
                  <Link href="/products">
                    Best Selling
                  </Link>
                </li>

                <li>
                  <Link
                    href="/products"
                    className="wf-sale"
                  >
                    
 
<span
  className="px-2 h-5 flex items-center justify-center text-xs text-white"
  style={{ backgroundColor: "var(--wf-orange)" }}
>
  SALE
</span>
                  </Link>
                </li>
              </ul>
            </nav>

          </div>
        </div>
      </div>

      {/* =====================================================
          MOBILE NAVIGATION
      ====================================================== */}

      {navigationOpen && (
        <div className="wf-mobile-navigation">

          <nav>
            <Link href="/">
              Popular
            </Link>

            <Link href="/products">
              Shop
            </Link>

            <Link href="/products">
              Best Selling
            </Link>

            <Link
              href="/products"
              className="wf-sale"
            >
              SALE
            </Link>
          </nav>

        </div>
      )}
    </header>
  );
};

export default Header;