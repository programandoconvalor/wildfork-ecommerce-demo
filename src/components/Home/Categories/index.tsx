"use client";

import React, {
  useCallback,
  useMemo,
  useRef,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { useProducts } from "@/features/products/hooks/use-products";
import { useProductFilters } from "@/features/products/context/ProductFiltersContext";

type CategoryItem = {
  name: string;
  value: string;
  image: string;
};

const Categories = () => {
  const router = useRouter();

  const swiperRef = useRef<SwiperInstance | null>(null);

  const {
    data: productsData,
    isLoading,
    isError,
  } = useProducts();

  const { setCategory } = useProductFilters();

  const products = productsData?.products ?? [];

  /*
   * =========================================================
   * BUILD CATEGORIES FROM API
   * =========================================================
   *
   * We create one category per unique product.category.
   *
   * The image comes from the first product found in that
   * category using its thumbnail.
   */
  const categories = useMemo<CategoryItem[]>(() => {
    const categoryMap = new Map<string, CategoryItem>();

    products.forEach((product) => {
      const category = String(
        product.category ?? "",
      ).trim();

      const image = String(
        product.thumbnail ?? "",
      ).trim();

      if (!category || !image) {
        return;
      }

      if (!categoryMap.has(category)) {
        categoryMap.set(category, {
          name: category,
          value: category,
          image,
        });
      }
    });

    return Array.from(
      categoryMap.values(),
    ).sort((a, b) =>
      a.name.localeCompare(
        b.name,
        undefined,
        {
          sensitivity: "base",
        },
      ),
    );
  }, [products]);

  /*
   * =========================================================
   * SWIPER CONTROLS
   * =========================================================
   */

  const handlePrev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  /*
   * =========================================================
   * CATEGORY NAVIGATION
   * =========================================================
   *
   * The selected category is stored in the same global
   * ProductFiltersContext used by the Header and /products.
   */
  const handleCategoryClick = useCallback(
    (category: string) => {
      setCategory(category);
      router.push("/products");
    },
    [router, setCategory],
  );

  /*
   * =========================================================
   * LOADING STATE
   * =========================================================
   */

  if (isLoading) {
    return (
      <section className="overflow-hidden pt-17.5">
        <div className="mx-auto w-full max-w-[1170px] px-4 pb-15 sm:px-8 xl:px-0">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <div className="h-5 w-28 animate-pulse rounded bg-gray-2" />

              <div className="mt-3 h-8 w-64 animate-pulse rounded bg-gray-2" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center"
                >
                  <div className="h-[145px] w-[145px] animate-pulse rounded-full bg-gray-1" />

                  <div className="mt-5 h-5 w-24 animate-pulse rounded bg-gray-1" />
                </div>
              ),
            )}
          </div>
        </div>
      </section>
    );
  }

  /*
   * =========================================================
   * API ERROR
   * =========================================================
   */

  if (isError) {
    return (
      <section className="overflow-hidden pt-17.5">
        <div className="mx-auto w-full max-w-[1170px] px-4 pb-15 sm:px-8 xl:px-0">
          <div className="flex min-h-[220px] items-center justify-center">
            <p
              className="text-sm text-dark-4"
              role="alert"
            >
              Unable to load categories.
            </p>
          </div>
        </div>
      </section>
    );
  }

  /*
   * =========================================================
   * EMPTY STATE
   * =========================================================
   */

  if (categories.length === 0) {
    return null;
  }

  /*
   * =========================================================
   * CATEGORY SECTION
   * =========================================================
   */

  return (
    <section className="overflow-hidden pt-17.5">
      <div className="mx-auto w-full max-w-[1170px] px-4 pb-15 sm:px-8 xl:px-0">
        <div className="categories-carousel common-carousel">

          {/* =================================================
              SECTION HEADER
              ================================================= */}

          <div className="mb-10 flex items-center justify-between">
            <div>
              <span className="mb-1.5 flex items-center gap-2.5 font-medium text-dark">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <g clipPath="url(#category-icon-clip)">
                    <path
                      d="M3.94024 13.4474C2.6523 12.1595 2.00832 11.5155 1.7687 10.68C1.52908 9.84449 1.73387 8.9571 2.14343 7.18231L2.37962 6.15883C2.72419 4.66569 2.89648 3.91912 3.40771 3.40789C3.91894 2.89666 4.66551 2.72437 6.15865 2.3798L7.18213 2.14361C8.95692 1.73405 9.84431 1.52927 10.6798 1.76889C11.5153 2.00851 12.1593 2.65248 13.4472 3.94042L14.9719 5.46512C17.2128 7.70594 18.3332 8.82635 18.3332 10.2186C18.3332 11.6109 17.2128 12.7313 14.9719 14.9721C12.7311 17.2129 11.6107 18.3334 10.2184 18.3334C8.82617 18.3334 7.70576 17.2129 5.46494 14.9721L3.94024 13.4474Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />

                    <circle
                      cx="7.17245"
                      cy="7.39917"
                      r="1.66667"
                      transform="rotate(-45 7.17245 7.39917)"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />

                    <path
                      d="M9.61837 15.4164L15.4342 9.6004"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </g>

                  <defs>
                    <clipPath id="category-icon-clip">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                      />
                    </clipPath>
                  </defs>
                </svg>

                Categories
              </span>

              <h2 className="font-semibold text-xl text-dark xl:text-heading-5">
                Browse by Category
              </h2>
            </div>

            {/* =================================================
                SWIPER NAVIGATION
                ================================================= */}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrev}
                className="swiper-button-prev"
                aria-label="Previous categories"
              >
                <svg
                  className="fill-current"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.4881 4.43057C15.8026 4.70014 15.839 5.17361 15.5694 5.48811L9.98781 12L15.5694 18.5119C15.839 18.8264 15.8026 19.2999 15.4881 19.5695C15.1736 19.839 14.7001 19.8026 14.4306 19.4881L8.43056 12.4881C8.18981 12.2072 8.18981 11.7928 8.43056 11.5119L14.4306 4.51192C14.7001 4.19743 15.1736 4.161 15.4881 4.43057Z"
                  />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="swiper-button-next"
                aria-label="Next categories"
              >
                <svg
                  className="fill-current"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.51192 4.43057C8.82641 4.161 9.29989 4.19743 9.56946 4.51192L15.5695 11.5119C15.8102 11.7928 15.8102 12.2072 15.5695 12.4881L9.56946 19.4881C9.29989 19.8026 8.82641 19.839 8.51192 19.5695C8.19743 19.2999 8.161 18.8264 8.43057 18.5119L14.0122 12L8.43057 5.48811C8.161 5.17361 8.19743 4.70014 8.51192 4.43057Z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* =================================================
              DYNAMIC API CATEGORIES
              ================================================= */}

          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView={2}
            spaceBetween={20}
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              1000: {
                slidesPerView: 4,
              },
              1200: {
                slidesPerView: 6,
              },
            }}
          >
            {categories.map((category) => (
              <SwiperSlide key={category.value}>
                <button
                  type="button"
                  onClick={() =>
                    handleCategoryClick(
                      category.value,
                    )
                  }
                  className="group flex w-full flex-col items-center text-center"
                  aria-label={`View ${category.name} products`}
                >
                  {/* Category image from API */}
                  <div className="flex h-[145px] w-[145px] items-center justify-center overflow-hidden rounded-full bg-[#F3F4F8] transition duration-300 group-hover:bg-[#FFF1EC] group-hover:shadow-md">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={120}
                      height={120}
                      className="h-[110px] w-[110px] object-contain transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Category name from API */}
                  <span className="mt-5 line-clamp-2 text-base font-medium capitalize text-dark transition-colors duration-200 group-hover:text-red">
                    {category.name}
                  </span>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Categories;