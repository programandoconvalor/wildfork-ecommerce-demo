import type { Product } from "@/features/products/types/product.types";

export type CartItem = Product & {
  quantity: number;
  discountedPrice: number;

  /**
   * Normalized image structure used by existing cart UI components.
   */
  imgs: {
    thumbnails: string[];
    previews: string[];
  };
};

export type CartState = {
  items: CartItem[];
};