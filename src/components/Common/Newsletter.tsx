"use client";

import React, { FormEvent, useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) return;

    setSubmitted(true);
  };

  return (
    <section className="overflow-hidden py-15 sm:py-17.5">
      <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="relative overflow-hidden rounded-2xl bg-dark px-5 py-10 sm:px-10 lg:px-14 xl:px-16">
          {/* Decorative orange shape */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--wf-orange)] opacity-10"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-[var(--wf-orange)] opacity-5"
          />

          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Content */}
            <div className="max-w-[540px]">
              <span className="mb-3 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wide text-[var(--wf-orange)]">
                Stay Updated
              </span>

              <h2 className="max-w-[500px] text-xl font-bold leading-tight text-white sm:text-2xl xl:text-heading-4">
                Get the latest products & exclusive offers
              </h2>

              <p className="mt-3 max-w-[500px] text-sm leading-6 text-white/70 sm:text-base">
                Subscribe to our newsletter and be the first to discover new
                products, special deals and exclusive offers.
              </p>
            </div>

            {/* Newsletter form */}
            <div className="w-full max-w-[500px]">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>

                  <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setSubmitted(false);
                    }}
                    placeholder="Enter your email address"
                    required
                    className="h-12 w-full rounded-lg border border-white/10 bg-white px-5 text-sm text-dark outline-none transition placeholder:text-dark-4 focus:border-[var(--wf-orange)] focus:ring-2 focus:ring-[var(--wf-orange)]/20"
                  />

                  <button
                    type="submit"
                    className="inline-flex h-12 shrink-0 items-center justify-center rounded-lg bg-[var(--wf-orange)] px-7 text-sm font-semibold text-white transition duration-200 hover:bg-[var(--wf-orange-hover)]"
                  >
                    Subscribe
                  </button>
                </div>
              </form>

              {submitted && (
                <p className="mt-3 text-sm font-medium text-[var(--wf-orange)]">
                  Thank you for subscribing!
                </p>
              )}

              <p className="mt-3 text-xs text-white/50">
                By subscribing, you agree to receive updates and promotional
                emails from Wild Fork.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;