"use client";

type ProductFiltersProps = {
  search: string;
  category: string;
  sort: string;
  categories: string[];
  hasActiveFilters: boolean;

  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onClearFilters: () => void;
};

/**
 * ProductFilters
 *
 * Responsive catalog filters.
 *
 * Desktop:
 * - Displays as a sidebar.
 *
 * Mobile:
 * - Uses the same controls in a compact layout.
 *
 * All category values are received from the API-derived
 * product collection. No category names are hardcoded.
 */
export function ProductFilters({
  search,
  category,
  sort,
  categories,
  hasActiveFilters,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onClearFilters,
}: ProductFiltersProps) {
  return (
    <aside
      className="h-fit rounded-lg border border-gray-3 bg-white"
      aria-label="Product filters"
    >
      {/* =====================================================
          FILTER HEADER
          ===================================================== */}

      <div className="flex items-center justify-between border-b border-gray-3 px-5 py-4">
        <h2 className="font-semibold text-dark">
          Filters
        </h2>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="text-sm font-medium text-brand transition hover:text-dark"
          >
            Clear All
          </button>
        )}
      </div>

      {/* =====================================================
          SEARCH
          ===================================================== */}

      <div className="border-b border-gray-3 p-5">
        <label
          htmlFor="product-search"
          className="mb-3 block text-sm font-medium text-dark"
        >
          Search
        </label>

        <div className="relative">
          <input
            id="product-search"
            type="search"
            value={search}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search products..."
            className="w-full rounded-md border border-gray-3 bg-white py-2.5 pl-4 pr-10 text-sm text-dark outline-none transition placeholder:text-dark-4 focus:border-brand focus:ring-1 focus:ring-brand"
          />

          {/* Search icon */}
          <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-dark-4"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
              stroke="currentColor"
              strokeWidth="2"
            />

            <path
              d="m21 21-4.35-4.35"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* =====================================================
          CATEGORY
          ===================================================== */}

      <div className="border-b border-gray-3 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-medium text-dark">
            Category
          </h3>

          <span className="text-xs text-dark-4">
            {categories.length}
          </span>
        </div>

        <div className="space-y-3">
          {/* All categories */}
          <label className="flex cursor-pointer items-center justify-between gap-3 text-sm text-dark">
            <span className="flex items-center gap-3">
              <input
                type="radio"
                name="product-category"
                value="all"
                checked={category === "all"}
                onChange={() =>
                  onCategoryChange("all")
                }
                className="h-4 w-4 accent-brand"
              />

              All categories
            </span>
          </label>

          {/* API categories */}
          {categories.map((item) => (
            <label
              key={item}
              className="flex cursor-pointer items-center gap-3 text-sm text-dark transition hover:text-brand"
            >
              <input
                type="radio"
                name="product-category"
                value={item}
                checked={category === item}
                onChange={() =>
                  onCategoryChange(item)
                }
                className="h-4 w-4 accent-brand"
              />

              <span className="capitalize">
                {item}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* =====================================================
          SORT
          ===================================================== */}

      <div className="p-5">
        <label
          htmlFor="product-sort"
          className="mb-3 block text-sm font-medium text-dark"
        >
          Sort by
        </label>

        <select
          id="product-sort"
          value={sort}
          onChange={(event) =>
            onSortChange(event.target.value)
          }
          className="w-full rounded-md border border-gray-3 bg-white px-3 py-2.5 text-sm text-dark outline-none transition focus:border-brand focus:ring-1 focus:ring-brand"
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
      </div>
    </aside>
  );
}