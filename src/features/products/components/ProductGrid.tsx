import type { Product } from "../types/product.types";
import { ProductCard } from "./ProductCard";

type ProductGridProps = {
  products: Product[];
};

/**
 * ProductGrid
 *
 * Fully responsive product collection.
 *
 * Breakpoints:
 *
 * Mobile:
 *   1 column
 *
 * Tablet:
 *   2 columns
 *
 * Desktop:
 *   3 columns
 *
 * The grid intentionally avoids forcing four desktop
 * columns because the current catalog layout includes
 * a filter sidebar.
 */
export function ProductGrid({
  products,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div
        className="
          flex
          min-h-60
          items-center
          justify-center
          rounded-2xl
          border
          border-dashed
          border-gray-3
          bg-white
          px-6
        "
      >
        <p className="text-center text-sm text-dark-4">
          No products found.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-5
        sm:gap-6
        md:grid-cols-2
        md:gap-6
        xl:grid-cols-3
        xl:gap-7.5
      "
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}