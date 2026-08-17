"use client";

import { useEffect } from "react";
import Link from "next/link";

type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  useEffect(() => {
    // Log the error for debugging/monitoring.
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="min-h-[calc(100vh-156px)] bg-gray-1 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-center">
        <section
          aria-labelledby="error-title"
          className="relative w-full max-w-3xl overflow-hidden rounded-[10px] border border-gray-3 bg-white shadow-1"
        >
          {/* Wild Fork brand accent */}
          <div
            aria-hidden="true"
            className="h-1 w-full bg-orange"
          />

          <div className="px-5 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
            {/* Error icon */}
            <div
              aria-hidden="true"
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange/10 text-orange sm:h-24 sm:w-24"
            >
              <svg
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 sm:h-11 sm:w-11"
              >
                <path
                  d="M12 3L21 20H3L12 3Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M12 9V13"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />

                <circle
                  cx="12"
                  cy="16.5"
                  r="0.8"
                  fill="currentColor"
                />
              </svg>
            </div>

            {/* Status */}
            <div className="mt-6 flex justify-center">
              <span className="inline-flex items-center rounded-full bg-gray-1 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-dark-4">
                Something went wrong
              </span>
            </div>

            {/* Title */}
            <h1
              id="error-title"
              className="mt-5 text-center text-3xl font-semibold leading-tight tracking-tight text-dark sm:text-4xl lg:text-[42px]"
            >
              We&apos;re having trouble
            </h1>

            {/* Description */}
            <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-7 text-dark-4 sm:text-base">
              Something unexpected happened while loading this page.
              Please try again or return to the Wild Fork catalog.
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={reset}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-dark px-7 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 sm:w-auto"
              >
                Try again
              </button>

              <Link
                href="/products"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-md border border-gray-3 bg-white px-7 text-sm font-semibold text-dark transition-all duration-200 hover:-translate-y-0.5 hover:border-orange hover:bg-orange hover:text-white focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 sm:w-auto"
              >
                Browse products
              </Link>
            </div>

            {/* Supporting message */}
            <div className="mx-auto mt-9 flex max-w-md items-center justify-center gap-2 border-t border-gray-3 pt-5 text-center text-xs leading-5 text-dark-4">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange"
              />

              <span>
                Your cart and catalog are safe. Please try again.
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}